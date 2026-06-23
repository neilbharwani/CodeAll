'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'
import { Course } from '@/lib/courseTypes'

interface CourseCardProps {
  course: Course
  index?: number
  progress?: number
}

export default function CourseCard({ course, index = 0, progress }: CourseCardProps) {
  const totalMins = Math.round(course.lessons.reduce((s, l) => s + l.durationSeconds, 0) / 60)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/courses/${course.slug}`} className="group block">
        <motion.div
          className="relative rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-6 overflow-hidden h-full"
          whileHover={{ borderColor: 'rgba(255,255,255,0.12)', y: -3 }}
          transition={{ duration: 0.25 }}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          </div>

          {/* Top row */}
          <div className="flex items-start justify-between mb-8">
            <span className="text-2xl select-none">{course.icon}</span>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -4, y: 4 }}
              whileHover={{ x: 0, y: 0 }}
            >
              <ArrowUpRight className="w-4 h-4 text-white/30" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/25 tracking-widest uppercase font-medium">{course.category}</span>
              <span className="text-white/10">·</span>
              <span className="text-[10px] text-white/25 tracking-widest uppercase font-medium">{course.difficulty}</span>
            </div>
            <h3 className="text-white font-semibold text-base leading-snug group-hover:text-white/90 transition-colors">
              {course.title}
            </h3>
            <p className="text-white/30 text-sm leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* Progress bar (if enrolled) */}
          {progress !== undefined && (
            <div className="mb-5">
              <div className="flex justify-between text-[10px] text-white/25 mb-1.5">
                <span>Progress</span><span>{progress}%</span>
              </div>
              <div className="h-px bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 text-[11px] text-white/20">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" />{course.lessons.length} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />{totalMins} min
            </span>
            <span className="ml-auto">{course.totalPoints} XP</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
