'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import MagneticButton from './MagneticButton'

const HERO_WORDS = ['Code', 'for', 'free.']
const SUBTITLE = "Real lessons. No subscription. No ads. Just you and the skills you've been meaning to learn."

const MARQUEE_ITEMS = ['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Node.js', 'Git', 'APIs', 'SQL', 'TypeScript', 'Next.js', 'MongoDB']

function useMousePosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return { x, y }
}

function FloatingOrb({ delay = 0, size = 400, x = '30%', y = '20%' }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, translateX: '-50%', translateY: '-50%' }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.07, 0.04] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="w-full h-full rounded-full bg-white blur-[80px]" />
    </motion.div>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = Date.now()
      const dur = 1800
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 4)
        setCount(Math.round(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
}
const lineReveal = {
  hidden: { y: '100%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.65, delay: 0.1 + i * 0.08 },
  }),
}

export default function HomeClient() {
  const { x: mx, y: my } = useMousePosition()
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="bg-[#0a0a0a] overflow-hidden">
      {/* Cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          x: sx, y: sy,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
        }}
      />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
        {/* Ambient orbs */}
        <FloatingOrb size={600} x="20%" y="40%" delay={0} />
        <FloatingOrb size={400} x="80%" y="60%" delay={2} />
        <FloatingOrb size={300} x="60%" y="20%" delay={4} />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto w-full pt-24"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium">Free coding education</span>
          </motion.div>

          {/* Hero headline */}
          <h1 className="text-[clamp(56px,10vw,140px)] font-bold leading-[0.95] tracking-tight mb-10 overflow-hidden">
            {['Learn to', 'code for', 'free.'].map((line, i) => (
              <div key={i} className="overflow-hidden block">
                <motion.span
                  className="block"
                  style={{ color: i === 2 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.95)' }}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={lineReveal}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Subtitle + CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <p className="max-w-sm text-white/40 text-base leading-relaxed">
              {SUBTITLE}
            </p>
            <div className="flex items-center gap-4 pb-1">
              <Link href="/courses">
                <MagneticButton>
                  <motion.button
                    className="group flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-xl"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    Browse courses
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </MagneticButton>
              </Link>
              <Link href="/signup">
                <motion.button
                  className="text-sm text-white/40 hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/20"
                  whileHover={{ x: 2 }}
                >
                  Sign up free
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="relative border-y border-white/[0.04] py-5 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-xs text-white/20 tracking-[0.2em] uppercase font-medium shrink-0">
              {item}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ─── STATS ─── */}
      <section className="px-6 py-28 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={stagger}
        >
          {[
            { label: 'Video lessons', value: 79, suffix: '+' },
            { label: 'Always costs', value: '$0', isText: true },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#0a0a0a] p-10 flex flex-col justify-between min-h-[180px]"
            >
              <span className="text-xs text-white/25 tracking-widest uppercase">{stat.label}</span>
              <span className="text-5xl font-bold text-white/90 tracking-tight">
                {stat.isText ? stat.value : <CountUp to={stat.value as number} suffix={stat.suffix} />}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section className="px-6 py-20 max-w-5xl mx-auto border-t border-white/[0.04]">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs text-white/25 tracking-widest uppercase mb-6">Why CodeAll</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              I built this because<br />I wish it existed<br />
              <span className="text-white/30">when I was learning.</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-6 pt-2">
            {[
              'Coding changed my life. I wanted to share that with anyone who\'s curious, no matter their background or bank account.',
              'No subscriptions. No upsells. No ads. Just real lessons, taught clearly, for free — forever.',
              'If you\'ve been putting off learning to code because you couldn\'t afford it, or didn\'t know where to start, this is for you.',
            ].map((para, i) => (
              <p key={i} className="text-white/40 text-base leading-relaxed">{para}</p>
            ))}
            <Link href="/signup" className="inline-flex items-center gap-2 text-white text-sm font-medium mt-2 group">
              <span>Start for free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-24 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-xs text-white/25 tracking-widest uppercase mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.p>
          <motion.div
            className="grid md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={stagger}
          >
            {[
              { n: '01', title: 'Pick a course', body: 'Browse free courses from web fundamentals to advanced frameworks. All levels, all topics.' },
              { n: '02', title: 'Watch the lessons', body: 'Clean video lessons at your pace. Pause, rewind, replay as many times as you need.' },
              { n: '03', title: 'Level up', body: 'Earn XP, climb the leaderboard, and track your progress as you build real skills.' },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="group">
                <div className="text-[80px] font-black text-white/[0.04] leading-none mb-5 select-none group-hover:text-white/[0.07] transition-colors duration-500">
                  {step.n}
                </div>
                <h3 className="text-white font-semibold mb-3">{step.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-32 border-t border-white/[0.04]">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(32px,6vw,72px)] font-bold text-white leading-tight mb-6">
            Your first lesson<br />
            <span className="text-white/25">is one click away.</span>
          </h2>
          <p className="text-white/35 mb-10 text-base">No account needed to start watching. Sign up when you're ready to track progress.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/courses">
              <MagneticButton>
                <motion.button
                  className="bg-white text-black font-semibold px-8 py-3.5 rounded-xl text-sm"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Browse courses
                </motion.button>
              </MagneticButton>
            </Link>
            <Link href="/signup">
              <motion.button
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
                whileHover={{ x: 2 }}
              >
                Create free account →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
