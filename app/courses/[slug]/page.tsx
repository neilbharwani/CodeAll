import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Clock, ChevronRight, CheckCircle, Play } from 'lucide-react'
import { getCourseBySlug, getAllCourses } from '@/lib/courses'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import EnrollButton from '@/components/EnrollButton'
import ReviewSection from '@/components/ReviewSection'

export const dynamicParams = true

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }))
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const totalMins = Math.round(course.lessons.reduce((s, l) => s + l.durationSeconds, 0) / 60)

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-10">
        <Link href="/courses" className="hover:text-neutral-300 transition-colors">Courses</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-neutral-400">{course.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{course.icon}</span>
            <Badge variant="outline" className="border-neutral-700 text-neutral-500 text-xs">
              {course.category}
            </Badge>
            <Badge variant="outline" className="border-neutral-700 text-neutral-500 text-xs">
              {course.difficulty}
            </Badge>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-4 leading-tight">{course.title}</h1>
          <p className="text-neutral-400 leading-relaxed mb-8">{course.longDescription}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500 mb-8">
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{course.lessons.length} lessons</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{totalMins} min total</span>
            <span className="text-neutral-500">{course.totalPoints} XP to earn</span>
          </div>

          <Separator className="bg-neutral-800 mb-8" />

          {/* What you'll learn */}
          <h2 className="text-lg font-semibold text-white mb-4">What you&apos;ll learn</h2>
          <div className="grid sm:grid-cols-2 gap-2.5 mb-10">
            {course.whatYouLearn.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-neutral-400">
                <CheckCircle className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-white mb-3">Prerequisites</h2>
              <div className="flex flex-wrap gap-2 mb-10">
                {course.prerequisites.map((p) => (
                  <Badge key={p} variant="outline" className="border-neutral-700 text-neutral-500">
                    {p}
                  </Badge>
                ))}
              </div>
            </>
          )}

          <Separator className="bg-neutral-800 mb-8" />

          {/* Curriculum */}
          <h2 className="text-lg font-semibold text-white mb-4">Curriculum</h2>
          <div className="space-y-px">
            {course.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-neutral-900 transition-colors group"
              >
                <span className="text-neutral-700 font-mono text-xs w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <Play className="w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-400 shrink-0 transition-colors" />
                <span className="flex-1 text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">{lesson.title}</span>
                <span className="text-neutral-700 text-xs">{lesson.duration}</span>
                <span className="text-neutral-700 text-xs">+{lesson.points}xp</span>
              </Link>
            ))}
          </div>

          <Separator className="bg-neutral-800 my-10" />

          {/* Reviews */}
          <ReviewSection courseId={course.id} />
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="border border-neutral-800 rounded-xl p-6 space-y-5">
            <div>
              <p className="text-2xl font-semibold text-white">Free</p>
              <p className="text-neutral-600 text-sm mt-0.5">Always, forever.</p>
            </div>
            <EnrollButton courseId={course.id} courseSlug={course.slug} firstLessonSlug={course.lessons[0]?.slug} totalLessons={course.lessons.length} />
            <Separator className="bg-neutral-800" />
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neutral-700" />Full lifetime access</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neutral-700" />Watch on any device</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neutral-700" />Earn {course.totalPoints} XP</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neutral-700" />Course completion badge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
