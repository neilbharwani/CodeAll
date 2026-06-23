import { notFound } from 'next/navigation'
import { getLessonBySlug, getAllCourses } from '@/lib/courses'
import LessonClient from '@/components/LessonClient'
import type { Course } from '@/lib/courseTypes'

export const dynamicParams = true

export function generateStaticParams() {
  const courses = getAllCourses()
  return courses.flatMap((c) =>
    c.lessons.map((l) => ({ slug: c.slug, lessonSlug: l.slug }))
  )
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { slug, lessonSlug } = await params
  const result = getLessonBySlug(slug, lessonSlug)
  if (!result) notFound()

  const { lesson, course, prevLesson, nextLesson } = result
  const videoSrc = course.videoPath(lesson)

  // Strip the non-serializable videoPath function before passing to client
  const { videoPath: _, ...courseData }: { videoPath: unknown } & Course = course

  return (
    <LessonClient
      lesson={lesson}
      course={courseData as Course}
      prevLesson={prevLesson ?? null}
      nextLesson={nextLesson ?? null}
      videoSrc={videoSrc}
    />
  )
}
