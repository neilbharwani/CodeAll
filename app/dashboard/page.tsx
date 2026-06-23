'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, ArrowUpRight } from 'lucide-react'
import { getLevelProgress } from '@/lib/levels'
import CourseCard from '@/components/CourseCard'
import { Course } from '@/lib/courseTypes'

import type { Variants } from 'framer-motion'
const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } }
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const userPoints = 0
  const level = getLevelProgress(userPoints)

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  useEffect(() => { fetch('/api/courses').then((r) => r.json()).then(setCourses) }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-white/10 border-t-white/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }
  if (!session) return null

  const firstName = session.user?.name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 pt-28 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="space-y-12"
        >
          {/* Greeting */}
          <motion.div variants={fadeUp}>
            <p className="text-xs text-white/25 tracking-widest uppercase mb-3">Dashboard</p>
            <h1 className="text-3xl font-bold text-white">Hey, {firstName}.</h1>
            <p className="text-white/30 text-sm mt-1.5">Every lesson counts. Keep going.</p>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'XP Points', value: userPoints, sub: `${level.pointsToNext} to ${level.nextLevel}` },
              { label: 'Current Level', value: level.level, sub: `${level.progress}% progress` },
              { label: 'Day Streak', value: '0', sub: 'days in a row' },
              { label: 'Lessons Done', value: '0', sub: 'this month' },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                <p className="text-[10px] text-white/25 tracking-widest uppercase mb-3">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-white/20 mt-1">{stat.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* XP Bar */}
          {userPoints > 0 && (
            <motion.div variants={fadeUp} className="space-y-2">
              <div className="flex justify-between text-xs text-white/30">
                <span>{level.level}</span>
                <span>{level.pointsToNext} XP to {level.nextLevel}</span>
              </div>
              <div className="h-px bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/50"
                  initial={{ width: 0 }}
                  animate={{ width: `${level.progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </motion.div>
          )}

          {/* Divider */}
          <div className="border-t border-white/[0.04]" />

          {/* Courses */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">All Courses</h2>
                <p className="text-white/25 text-xs mt-0.5">Start learning or continue where you left off.</p>
              </div>
              <Link href="/courses" className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors">
                Browse all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            {courses.length === 0 ? (
              <div className="py-16 text-center border border-white/[0.04] rounded-2xl">
                <p className="text-white/20 text-sm">Courses are on their way.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            )}
          </motion.div>

          {/* XP explanation */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.05] p-6 flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-white/40" />
            </div>
            <div>
              <p className="text-white font-medium text-sm mb-1">How XP works</p>
              <p className="text-white/30 text-xs leading-relaxed">
                Complete lessons to earn XP points. Each lesson is worth 10–25 XP depending on its length.
                Level up from Beginner → Explorer → Builder → Creator → Master.
                Your rank on the leaderboard updates in real time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
