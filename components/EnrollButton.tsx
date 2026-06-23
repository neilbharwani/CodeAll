'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

interface Props {
  courseId: string
  courseSlug: string
  firstLessonSlug?: string
  totalLessons: number
}

type State = 'loading' | 'not_started' | 'in_progress' | 'completed'

export default function EnrollButton({ courseId, courseSlug, firstLessonSlug, totalLessons }: Props) {
  const { data: session, status } = useSession()
  const [state, setState] = useState<State>('loading')
  const [resumeSlug, setResumeSlug] = useState<string | undefined>(firstLessonSlug)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) { setState('not_started'); return }

    fetch(`/api/progress?courseId=${courseId}`)
      .then((r) => r.json())
      .then((data: { lessonId: string }[]) => {
        if (!Array.isArray(data) || data.length === 0) {
          setState('not_started')
        } else if (data.length >= totalLessons) {
          setState('completed')
        } else {
          setState('in_progress')
        }
      })
      .catch(() => setState('not_started'))
  }, [session, status, courseId, totalLessons])

  const baseClass = 'w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors'

  if (state === 'loading') {
    return (
      <button disabled className={`${baseClass} bg-white/5 text-white/20 cursor-default`}>
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    )
  }

  if (state === 'completed') {
    return (
      <div className="space-y-2">
        <div className={`${baseClass} bg-white/5 text-white/40 border border-white/[0.06] cursor-default text-xs`}>
          ✓ Course completed
        </div>
        {firstLessonSlug && (
          <Link href={`/courses/${courseSlug}/lessons/${firstLessonSlug}`} className="block">
            <button className={`${baseClass} bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.07] text-xs`}>
              Rewatch from beginning
            </button>
          </Link>
        )}
      </div>
    )
  }

  if (!session) {
    return (
      <Link href="/login" className="block">
        <button className={`${baseClass} bg-white text-black hover:bg-white/90`}>
          Sign in to start
        </button>
      </Link>
    )
  }

  const href = firstLessonSlug ? `/courses/${courseSlug}/lessons/${firstLessonSlug}` : `/courses/${courseSlug}`
  const label = state === 'in_progress' ? 'Continue Learning' : 'Start Learning'

  return (
    <Link href={href} className="block">
      <button className={`${baseClass} bg-white text-black hover:bg-white/90`}>
        {label}
      </button>
    </Link>
  )
}
