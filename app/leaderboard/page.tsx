'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface User { _id: string; name: string; points: number; level: string; streak: number }

import type { Variants } from 'framer-motion'
const stagger: Variants = { show: { transition: { staggerChildren: 0.05 } } }
const row: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((d) => { setUsers(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 pt-32 pb-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs text-white/25 tracking-widest uppercase mb-4">Leaderboard</p>
          <h1 className="text-4xl font-bold text-white">Top learners.</h1>
          <p className="text-white/30 text-sm mt-3 max-w-xs">
            Rankings are live and updated as lessons are completed. Complete lessons to appear here.
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-white/[0.025] animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
            ))}
          </div>
        ) : users.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl mb-6 select-none"
            >
              🏆
            </motion.div>
            <h3 className="text-white font-semibold mb-2">No one here yet.</h3>
            <p className="text-white/25 text-sm max-w-xs mx-auto">
              Be the first. Sign up, complete a lesson, and your name goes to the top.
            </p>
            <a href="/signup" className="inline-flex items-center gap-1.5 mt-6 text-sm text-white/50 hover:text-white transition-colors">
              Sign up → earn your spot
            </a>
          </motion.div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show">
            {users.map((user, i) => {
              const isYou = session?.user?.id === user._id
              const isTop3 = i < 3
              return (
                <motion.div
                  key={user._id}
                  variants={row}
                  className={`flex items-center gap-5 px-4 py-4 rounded-xl mb-1.5 transition-colors ${
                    isYou
                      ? 'bg-white/[0.06] border border-white/10'
                      : 'hover:bg-white/[0.025]'
                  }`}
                >
                  {/* Rank */}
                  <span className={`w-6 text-right font-mono text-sm shrink-0 ${
                    i === 0 ? 'text-white font-bold' : i < 3 ? 'text-white/60' : 'text-white/20'
                  }`}>
                    {isTop3 ? ['①', '②', '③'][i] : i + 1}
                  </span>

                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isTop3 ? 'bg-white text-black' : 'bg-white/8 text-white/50'
                  }`}>
                    {user.name?.[0]?.toUpperCase()}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium truncate ${isYou ? 'text-white' : 'text-white/70'}`}>
                        {user.name}
                      </span>
                      {isYou && <span className="text-[10px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded-full">you</span>}
                    </div>
                    <span className="text-[11px] text-white/20">{user.level}</span>
                  </div>

                  {/* Points */}
                  <div className="flex items-center gap-1.5 text-sm font-mono shrink-0">
                    <Zap className="w-3.5 h-3.5 text-white/20" />
                    <span className={isTop3 ? 'text-white' : 'text-white/40'}>{user.points.toLocaleString()}</span>
                  </div>
                </motion.div>
              )
            })}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white/15 text-xs mt-8"
            >
              Top {users.length} by XP · Live data
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
