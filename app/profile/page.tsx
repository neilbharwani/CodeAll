'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Zap, BookOpen, Flame } from 'lucide-react'
import XPBar from '@/components/XPBar'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Course } from '@/lib/courseTypes'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const points = 0

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    fetch('/api/courses').then((r) => r.json()).then(setCourses)
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-neutral-800 text-white text-xl font-semibold">
            {session.user?.name?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold text-white">{session.user?.name}</h1>
          <p className="text-neutral-500 text-sm">{session.user?.email}</p>
        </div>
      </div>

      <Separator className="bg-neutral-800 mb-8" />

      {/* XP */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-neutral-400 mb-4">Progress</h2>
        <XPBar points={points} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { label: 'XP Points', value: points, icon: Zap },
          { label: 'Lessons Done', value: 0, icon: BookOpen },
          { label: 'Day Streak', value: 0, icon: Flame },
        ].map((stat, i) => (
          <Card key={i} className="bg-neutral-950 border-neutral-800">
            <CardContent className="pt-4 pb-3">
              <div className="text-neutral-700 text-xs mb-1.5 flex items-center gap-1">
                <stat.icon className="w-3 h-3" /> {stat.label}
              </div>
              <div className="text-lg font-semibold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-neutral-800 mb-8" />

      {/* Courses */}
      <div>
        <h2 className="text-sm font-medium text-neutral-400 mb-4">All Courses</h2>
        <div className="space-y-2">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-900 hover:border-neutral-700 transition-colors">
                <span className="text-xl shrink-0">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-neutral-300 font-medium truncate">{course.title}</div>
                  <div className="text-xs text-neutral-600">{course.lessons.length} lessons</div>
                </div>
                <div className="text-xs text-neutral-700">{course.totalPoints} XP</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
