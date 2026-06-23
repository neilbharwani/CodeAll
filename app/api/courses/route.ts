import { NextResponse } from 'next/server'
import { getAllCourses } from '@/lib/courses'

export async function GET() {
  const courses = getAllCourses()
  // strip the videoPath function before serializing
  const serializable = courses.map(({ videoPath: _, ...rest }) => rest)
  return NextResponse.json(serializable)
}
