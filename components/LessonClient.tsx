'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, CheckCircle, Zap, Eye } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import VideoPlayer from '@/components/VideoPlayer'
import dynamic from 'next/dynamic'
import { Course, Lesson } from '@/lib/courseTypes'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

interface Props {
  lesson: Lesson
  course: Course
  prevLesson: Lesson | null
  nextLesson: Lesson | null
  videoSrc: string
}

export default function LessonClient({ lesson, course, prevLesson, nextLesson, videoSrc }: Props) {
  const { data: session } = useSession()
  const [watchedPct, setWatchedPct] = useState(0)
  const [alreadyDone, setAlreadyDone] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Check if this lesson was already completed
  useEffect(() => {
    if (!session) return
    fetch(`/api/progress?courseId=${course.id}`)
      .then((r) => r.json())
      .then((data: { lessonId: string }[]) => {
        if (Array.isArray(data) && data.some((p) => p.lessonId === lesson.id)) {
          setAlreadyDone(true)
        }
      })
      .catch(() => {})
  }, [session, course.id, lesson.id])

  const canEarnXP = watchedPct >= 90
  const isDone = alreadyDone || justCompleted

  const handleComplete = async () => {
    if (isDone) return

    if (!canEarnXP) {
      toast.error(`Watch at least 90% of the video first (${watchedPct}% watched)`)
      return
    }

    setJustCompleted(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3500)
    toast.success(`+${lesson.points} XP earned`)

    if (session) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId: course.id, lessonId: lesson.id, points: lesson.points }),
        })
      } catch {}
    }
  }

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#0a0a0a]">
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={120} colors={['#fff', '#999', '#444']} />
      )}

      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/[0.04] overflow-y-auto hidden lg:flex flex-col">
        <div className="px-4 py-4 border-b border-white/[0.04]">
          <Link href={`/courses/${course.slug}`} className="flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors text-xs">
            <ChevronLeft className="w-3 h-3" />
            <span className="truncate">{course.title}</span>
          </Link>
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          {course.lessons.map((l, i) => {
            const isCurrent = l.slug === lesson.slug
            return (
              <Link key={l.id} href={`/courses/${course.slug}/lessons/${l.slug}`}>
                <div className={`flex items-center gap-3 px-4 py-2.5 transition-colors border-l-2 ${
                  isCurrent ? 'border-white/60 bg-white/[0.04]' : 'border-transparent hover:bg-white/[0.025]'
                }`}>
                  <span className={`font-mono text-[10px] shrink-0 w-5 ${isCurrent ? 'text-white/70' : 'text-white/15'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-xs leading-snug flex-1 ${isCurrent ? 'text-white' : 'text-white/30'}`}>
                    {l.title}
                  </span>
                  {isCurrent && isDone && (
                    <CheckCircle className="w-3 h-3 text-white/30 shrink-0" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <VideoPlayer
            src={videoSrc}
            title={lesson.title}
            onComplete={() => {}}
            onWatchProgress={setWatchedPct}
          />

          {/* Watch progress indicator */}
          {!isDone && watchedPct > 0 && watchedPct < 90 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-px bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${watchedPct}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[10px] text-white/20 shrink-0 font-mono">{watchedPct}% watched</span>
            </div>
          )}
          {!isDone && watchedPct >= 90 && (
            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[10px] text-white/30">Ready to complete</span>
            </div>
          )}

          <div className="mt-5 flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-white mb-1.5">{lesson.title}</h1>
              <p className="text-white/35 text-sm leading-relaxed">{lesson.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {!isDone && (
                <span className="flex items-center gap-1 text-xs text-white/20">
                  <Zap className="w-3.5 h-3.5" />+{lesson.points}
                </span>
              )}
              <motion.button
                onClick={handleComplete}
                disabled={isDone}
                title={!canEarnXP && !isDone ? `Watch ${90 - watchedPct}% more to earn XP` : undefined}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isDone
                    ? 'bg-white/5 text-white/25 cursor-default border border-white/[0.06]'
                    : canEarnXP
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/[0.04] text-white/25 border border-white/[0.06] cursor-not-allowed'
                }`}
                whileTap={isDone || !canEarnXP ? {} : { scale: 0.97 }}
              >
                {isDone ? (
                  <><CheckCircle className="w-3.5 h-3.5" /> Done</>
                ) : canEarnXP ? (
                  'Mark complete'
                ) : (
                  <><Eye className="w-3.5 h-3.5" /> Watch more</>
                )}
              </motion.button>
            </div>
          </div>

          <div className="border-t border-white/[0.04] mt-8 pt-6 flex items-center justify-between">
            {prevLesson ? (
              <Link href={`/courses/${course.slug}/lessons/${prevLesson.slug}`}>
                <motion.button
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors"
                  whileHover={{ x: -2 }}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </motion.button>
              </Link>
            ) : <div />}
            {nextLesson ? (
              <Link href={`/courses/${course.slug}/lessons/${nextLesson.slug}`}>
                <motion.button
                  className="flex items-center gap-1.5 text-xs bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            ) : (
              <Link href={`/courses/${course.slug}`}>
                <motion.button className="text-xs text-white/50 hover:text-white transition-colors" whileHover={{ x: 2 }}>
                  Back to course →
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
