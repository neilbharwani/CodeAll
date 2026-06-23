'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import toast from 'react-hot-toast'

const stagger: Variants = { show: { transition: { staggerChildren: 0.07 } } }
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      toast.error('Incorrect email or password.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

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
          <h1 className="text-2xl font-bold text-white mb-1.5">Welcome back.</h1>
          <p className="text-white/35 text-sm">Sign in to continue learning.</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div variants={item} className="space-y-4 mb-6">
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
                  autoComplete="current-password"
                  placeholder="••••••••"
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
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
            </motion.button>
          </motion.div>
        </form>

        <motion.p variants={item} className="text-center text-white/25 text-xs mt-8">
          No account?{' '}
          <Link href="/signup" className="text-white/50 hover:text-white transition-colors underline underline-offset-2 decoration-white/20">
            Sign up free
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
