'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[120px] font-black text-white/[0.04] leading-none mb-4 select-none font-mono">
          404
        </p>
        <h1 className="text-xl font-semibold text-white mb-2">Page not found.</h1>
        <p className="text-white/30 text-sm mb-8 max-w-xs">
          This page doesn't exist. But the courses do.
        </p>
        <Link href="/">
          <motion.button
            className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
            whileHover={{ y: -1 }}
          >
            Back to homepage
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
