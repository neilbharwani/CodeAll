'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/courses', label: 'Courses' },
  { href: '/leaderboard', label: 'Leaderboard' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setUserMenu(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 h-14 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              className="w-6 h-6 rounded-sm bg-white flex items-center justify-center"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <span className="text-black text-[10px] font-black leading-none">CA</span>
            </motion.div>
            <span className="text-sm font-semibold text-white tracking-tight">CodeAll</span>
          </Link>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = pathname.startsWith(href)
              return (
                <Link key={href} href={href} className="relative group">
                  <span className={`text-sm transition-colors duration-200 ${active ? 'text-white' : 'text-white/40 hover:text-white/80'}`}>
                    {label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-white/60"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-white group-hover:bg-white/15 transition-colors">
                    {session.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors max-w-24 truncate">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-44 rounded-xl bg-[#111] border border-white/8 shadow-2xl overflow-hidden"
                    >
                      {[
                        { href: '/dashboard', label: 'Dashboard' },
                        { href: '/profile', label: 'Profile' },
                      ].map(({ href, label }) => (
                        <Link key={href} href={href} className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                          {label}
                        </Link>
                      ))}
                      <div className="h-px bg-white/6 mx-3" />
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full text-left px-4 py-2.5 text-sm text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-white/40 hover:text-white/80 transition-colors">
                  Sign in
                </Link>
                <Link href="/signup">
                  <motion.button
                    className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    Get started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="block w-5 h-px bg-white/60 origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              className="block w-5 h-px bg-white/60 origin-center"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="block w-5 h-px bg-white/60 origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/6 px-6 py-6 space-y-1 md:hidden"
          >
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="block py-3 text-base text-white/60 hover:text-white transition-colors border-b border-white/5 last:border-0">
                {label}
              </Link>
            ))}
            <div className="pt-4">
              {session ? (
                <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-white/30">Sign out</button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="text-base text-white/60">Sign in</Link>
                  <Link href="/signup" className="text-base font-medium text-white">Get started →</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
