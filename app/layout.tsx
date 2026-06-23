import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/Providers'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'CodeAll — Free Coding Courses', template: '%s | CodeAll' },
  description: 'Free coding courses for everyone. Learn HTML, CSS, JavaScript, Python, React, and more through clear hands-on video lessons — no cost, no catch.',
  keywords: ['free coding courses', 'learn javascript free', 'python for beginners', 'web development course', 'coding tutorials'],
  authors: [{ name: 'CodeAll' }],
  openGraph: {
    type: 'website',
    title: 'CodeAll — Free Coding Courses',
    description: 'Learn to code for free. Real lessons, zero cost.',
    siteName: 'CodeAll',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-white/[0.04] py-8 px-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-white flex items-center justify-center">
                  <span className="text-black text-[8px] font-black leading-none">CA</span>
                </div>
                <span className="text-white/25 text-xs">CodeAll</span>
              </div>
              <p className="text-white/20 text-xs">Always free, forever.</p>
            </div>
          </footer>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111',
                color: '#f5f5f5',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                fontSize: '13px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
