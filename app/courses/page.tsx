'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import CourseCard from '@/components/CourseCard'
import { Course } from '@/lib/courseTypes'

import type { Variants } from 'framer-motion'
const FADE: Variants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => { setCourses(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))]
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase()
    return (
      (c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) &&
      (category === 'All' || c.category === category) &&
      (difficulty === 'All' || c.difficulty === difficulty)
    )
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs text-white/25 tracking-widest uppercase mb-4">All courses</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Pick something.<br />
            <span className="text-white/25">Start today.</span>
          </h1>
        </motion.div>

        {/* Search + Filters */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12 space-y-5"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white/80 placeholder:text-white/20 text-sm focus:outline-none focus:border-white/15 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <FilterChip key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
              ))}
              <div className="w-px h-4 bg-white/10 mx-1" />
              {difficulties.map((d) => (
                <FilterChip key={d} label={d} active={difficulty === d} onClick={() => setDifficulty(d)} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-white/[0.025] animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <motion.div initial="hidden" animate="show" variants={FADE} className="py-24 text-center">
            <p className="text-white/25 text-sm">No courses match.</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setDifficulty('All') }}
              className="mt-3 text-white/35 text-xs hover:text-white/60 transition-colors underline underline-offset-2"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`${search}-${category}-${difficulty}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            animate="show"
          >
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-white text-black'
          : 'text-white/35 hover:text-white/60 border border-white/[0.06] hover:border-white/12'
      }`}
    >
      {label}
    </motion.button>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-32 text-center"
    >
      {/* Animated empty visual */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/[0.06]"
          animate={{ rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-2 rounded-xl border border-white/[0.04]"
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl select-none">
          🎬
        </div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-3">Courses are on their way</h3>
      <p className="text-white/30 text-sm max-w-xs mx-auto leading-relaxed">
        The instructor is recording. New lessons drop soon — sign up to be notified when they go live.
      </p>
      <motion.div className="mt-8" whileHover={{ y: -2 }}>
        <a
          href="/signup"
          className="inline-flex items-center gap-2 text-sm text-white font-medium border border-white/10 px-5 py-2.5 rounded-xl hover:border-white/20 transition-colors"
        >
          Notify me
        </a>
      </motion.div>
    </motion.div>
  )
}
