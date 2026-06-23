import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()
    const users = await User.find({})
      .select('name points level streak completedLessons createdAt')
      .sort({ points: -1 })
      .limit(50)
    return NextResponse.json(users)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
