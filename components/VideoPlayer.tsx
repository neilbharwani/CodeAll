'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  title: string
  onComplete?: () => void
  onWatchProgress?: (pct: number) => void
}

function formatTime(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${m}:${String(sec).padStart(2, '0')}`
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

export default function VideoPlayer({ src, title, onComplete, onWatchProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastTimeRef = useRef(0)
  const maxWatchedRef = useRef(0)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [videoError, setVideoError] = useState(false)

  const resetHideTimer = useCallback(() => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (playing) hideTimer.current = setTimeout(() => setShowControls(false), 3000)
  }, [playing])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      const curr = video.currentTime
      const diff = curr - lastTimeRef.current

      // Only advance natural watch progress (< 1.5s gap = real playback, not a seek)
      if (diff > 0 && diff < 1.5 && !video.paused) {
        maxWatchedRef.current = Math.max(maxWatchedRef.current, curr)
        if (video.duration > 0) {
          onWatchProgress?.(Math.round((maxWatchedRef.current / video.duration) * 100))
        }
      }
      lastTimeRef.current = curr
      setCurrentTime(curr)

      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100)
      }
    }

    const onLoaded = () => setDuration(video.duration)
    const onEnded = () => { setPlaying(false); setShowControls(true); onComplete?.() }
    const onError = () => setVideoError(true)

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
    }
  }, [onComplete, onWatchProgress])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v || videoError) return
    if (playing) { v.pause(); setPlaying(false); setShowControls(true) }
    else { v.play(); setPlaying(true); resetHideTimer() }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const skip = (secs: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.min(Math.max(0, v.currentTime + secs), duration)
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (videoRef.current) videoRef.current.volume = val
    setMuted(val === 0)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !muted
    setMuted(!muted)
  }

  const changeSpeed = (s: number) => {
    setSpeed(s)
    if (videoRef.current) videoRef.current.playbackRate = s
    setShowSpeedMenu(false)
  }

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) { await el.requestFullscreen(); setFullscreen(true) }
    else { await document.exitFullscreen(); setFullscreen(false) }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-xl overflow-hidden select-none"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => { if (playing) setShowControls(false) }}
      onClick={togglePlay}
    >
      <video ref={videoRef} src={src} className="w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />

      {/* Placeholder when no file */}
      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] gap-3">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Play className="w-5 h-5 text-white/20 fill-white/20 ml-0.5" />
          </div>
          <p className="text-white/25 text-xs">Video not yet available</p>
          <p className="text-white/10 text-[10px]">Place your MP4 at /public{src}</p>
        </div>
      )}

      {/* Big play overlay */}
      <AnimatePresence>
        {!playing && !videoError && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Play className="w-7 h-7 text-white fill-white ml-0.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {(showControls || !playing) && !videoError && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-4 pb-3 pt-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrubber */}
            <div
              className="relative h-[3px] bg-white/15 rounded-full mb-4 cursor-pointer group/bar hover:h-[5px] transition-all duration-150"
              onClick={seek}
            >
              <div className="absolute h-full bg-white/20 rounded-full" style={{ width: `${buffered}%` }} />
              <div className="absolute h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 shadow opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => skip(-10)} className="text-white/60 hover:text-white transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={togglePlay} className="text-white transition-colors">
                {playing ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              </button>
              <button onClick={() => skip(10)} className="text-white/60 hover:text-white transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>

              <span className="text-white/50 text-[11px] font-mono ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              {/* Volume */}
              <div className="flex items-center gap-1.5">
                <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                  {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range" min={0} max={1} step={0.05}
                  value={muted ? 0 : volume}
                  onChange={changeVolume}
                  className="w-16 h-px cursor-pointer appearance-none bg-white/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>

              {/* Speed */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="text-white/50 hover:text-white text-[11px] font-mono px-2 py-0.5 rounded bg-white/8 hover:bg-white/15 transition-colors"
                >
                  {speed}×
                </button>
                <AnimatePresence>
                  {showSpeedMenu && (
                    <motion.div
                      className="absolute bottom-7 right-0 bg-[#111] border border-white/[0.08] rounded-lg overflow-hidden shadow-2xl z-10"
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    >
                      {SPEEDS.map((s) => (
                        <button
                          key={s}
                          onClick={() => changeSpeed(s)}
                          className={`block w-full px-4 py-1.5 text-xs text-left transition-colors ${s === speed ? 'text-white bg-white/8' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                          {s}×
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="text-white/60 hover:text-white transition-colors">
                {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
