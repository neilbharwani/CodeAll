import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Progress from '@/models/Progress'
import User from '@/models/User'
import { getLevel } from '@/lib/levels'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { courseId, lessonId, points } = await req.json()
    await connectDB()
    const existing = await Progress.findOne({ userId: session.user.id, courseId, lessonId })
    if (existing?.completed) {
      return NextResponse.json({ message: 'Already completed' })
    }
    await Progress.findOneAndUpdate(
      { userId: session.user.id, courseId, lessonId },
      { completed: true, completedAt: new Date() },
      { upsert: true }
    )
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $inc: { points }, $addToSet: { completedLessons: lessonId } },
      { new: true }
    )
    if (user) {
      const newLevel = getLevel(user.points)
      if (newLevel !== user.level) {
        await User.findByIdAndUpdate(session.user.id, { level: newLevel })
      }
    }
    return NextResponse.json({ success: true, totalPoints: user?.points })
  } catch (err) {
    console.error('Progress error:', err)
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const courseId = searchParams.get('courseId')
  await connectDB()
  const query = courseId
    ? { userId: session.user.id, courseId, completed: true }
    : { userId: session.user.id, completed: true }
  const progress = await Progress.find(query)
  return NextResponse.json(progress)
}
