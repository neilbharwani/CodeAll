'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Loader2, ArrowLeft, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import toast from 'react-hot-toast'

const stagger: Variants = { show: { transition: { staggerChildren: 0.07 } } }
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const perks = [
  'Track your progress across all lessons',
  'Earn XP and climb the leaderboard',
  'Leave reviews and help others decide',
]

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', 'bg-red-500/60', 'bg-yellow-500/60', 'bg-emerald-500/40', 'bg-emerald-500/80']

  if (!password) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-1"
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : 'bg-white/10'}`}
          />
        ))}
      </div>
      <p className="text-[10px] text-white/25">{labels[score]}</p>
    </motion.div>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Registration failed'); setLoading(false); return }
      await signIn('credentials', { email, password, redirect: false })
      router.push('/dashboard')
    } catch {
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.025] blur-[100px] pointer-events-none" />

      <motion.div
        className="w-full max-w-sm relative z-10"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div variants={item} className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1.5">Create your account.</h1>
          <p className="text-white/35 text-sm">Free forever. No card required.</p>
        </motion.div>

        {/* Perks */}
        <motion.div variants={item} className="mb-8 space-y-2">
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-2.5 text-xs text-white/30">
              <div className="w-4 h-4 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5" />
              </div>
              {p}
            </div>
          ))}
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div variants={item} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wide">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Alex Johnson"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/90 placeholder:text-white/20 text-sm focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wide">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/90 placeholder:text-white/20 text-sm focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/90 placeholder:text-white/20 text-sm focus:outline-none focus:border-white/20 transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {password && <PasswordStrength password={password} />}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create account'}
            </motion.button>
          </motion.div>
        </form>

        <motion.p variants={item} className="text-center text-white/25 text-xs mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-white/50 hover:text-white transition-colors underline underline-offset-2 decoration-white/20">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
