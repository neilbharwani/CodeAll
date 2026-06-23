import 'server-only'
import fs from 'fs'
import path from 'path'
import type { Lesson, Course } from './courseTypes'

export type { Lesson, Course }
export { getLevel, getLevelProgress } from './levels'

const COURSES_DIR = path.join(process.cwd(), 'content', 'courses')

function loadCourseFile(filename: string): Course | null {
  try {
    const raw = fs.readFileSync(path.join(COURSES_DIR, filename), 'utf-8')
    const data = JSON.parse(raw)
    const lessons: Lesson[] = (data.lessons || []).map((l: Lesson, i: number) => ({
      ...l,
      order: i + 1,
    }))
    const totalPoints = lessons.reduce((sum, l) => sum + (l.points || 0), 0)
    return { ...data, lessons, totalPoints } as Course
  } catch {
    return null
  }
}

type CourseWithVideoPath = Course & { videoPath: (lesson: Lesson) => string }

function withVideoPath(course: Course): CourseWithVideoPath {
  return {
    ...course,
    videoPath: (lesson: Lesson) => `/videos/${course.slug}/${lesson.videoFile}`,
  }
}

export function getAllCourses(): CourseWithVideoPath[] {
  if (!fs.existsSync(COURSES_DIR)) return []
  const files = fs.readdirSync(COURSES_DIR).filter((f) => f.endsWith('.json'))
  return (files.map(loadCourseFile).filter((c): c is Course => c !== null)).map(withVideoPath)
}

export function getCourseBySlug(slug: string): CourseWithVideoPath | null {
  const courses = getAllCourses()
  return courses.find((c) => c.slug === slug) ?? null
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  const course = getCourseBySlug(courseSlug)
  if (!course) return null
  const idx = course.lessons.findIndex((l) => l.slug === lessonSlug)
  if (idx === -1) return null
  return {
    lesson: course.lessons[idx],
    course,
    prevLesson: idx > 0 ? course.lessons[idx - 1] : null,
    nextLesson: idx < course.lessons.length - 1 ? course.lessons[idx + 1] : null,
  }
}
