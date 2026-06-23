import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Review from '@/models/Review'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const courseId = searchParams.get('courseId')
  if (!courseId) return NextResponse.json({ error: 'courseId required' }, { status: 400 })
  await connectDB()
  const reviews = await Review.find({ courseId }).sort({ createdAt: -1 }).limit(50)
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Sign in to leave a review' }, { status: 401 })
  const { courseId, rating, body } = await req.json()
  if (!courseId || !rating || !body?.trim()) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }
  if (body.trim().length < 10) {
    return NextResponse.json({ error: 'Review must be at least 10 characters' }, { status: 400 })
  }
  await connectDB()
  const existing = await Review.findOne({ userId: session.user.id, courseId })
  if (existing) return NextResponse.json({ error: 'You already reviewed this course' }, { status: 409 })
  const review = await Review.create({
    userId: session.user.id,
    userName: session.user.name || 'Anonymous',
    courseId,
    rating,
    body: body.trim(),
  })
  return NextResponse.json(review, { status: 201 })
}
