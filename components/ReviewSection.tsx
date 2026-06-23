'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import toast from 'react-hot-toast'

interface Review {
  _id: string
  userId: string
  userName: string
  courseId: string
  rating: number
  body: string
  createdAt: string
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHovered(n)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`transition-colors ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            className={`w-4 h-4 ${
              n <= (hovered || value)
                ? 'text-white fill-white'
                : 'text-neutral-700'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}

export default function ReviewSection({ courseId }: { courseId: string }) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)

  useEffect(() => {
    fetch(`/api/reviews?courseId=${courseId}`)
      .then((r) => r.json())
      .then((data) => {
        setReviews(data)
        if (session?.user?.id) {
          setHasReviewed(data.some((r: Review) => r.userId === session.user.id))
        }
        setLoading(false)
      })
  }, [courseId, session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) { toast.error('Sign in to leave a review'); return }
    if (!body.trim()) { toast.error('Please write something'); return }
    setSubmitting(true)
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, rating, body }),
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.error || 'Failed to post review')
    } else {
      setReviews((prev) => [data, ...prev])
      setHasReviewed(true)
      setBody('')
      toast.success('Review posted!')
    }
    setSubmitting(false)
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold text-white">Reviews</h2>
        {avgRating && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(parseFloat(avgRating))} />
            <span className="text-neutral-500 text-sm">{avgRating} ({reviews.length})</span>
          </div>
        )}
      </div>

      {/* Write a review */}
      {session && !hasReviewed && (
        <form onSubmit={handleSubmit} className="mb-8 p-5 border border-neutral-800 rounded-xl space-y-4">
          <p className="text-sm font-medium text-neutral-300">Leave a review</p>
          <div className="flex items-center gap-3">
            <StarRating value={rating} onChange={setRating} />
            <span className="text-neutral-600 text-sm">{rating}/5</span>
          </div>
          <Textarea
            placeholder="Share what you thought of this course…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            rows={3}
            className="bg-neutral-900 border-neutral-800 text-neutral-200 placeholder:text-neutral-600 resize-none focus-visible:ring-neutral-700"
          />
          <Button
            type="submit"
            disabled={submitting}
            size="sm"
            className="bg-white text-black hover:bg-neutral-200 font-medium"
          >
            {submitting ? 'Posting…' : 'Post Review'}
          </Button>
        </form>
      )}

      {!session && (
        <p className="text-sm text-neutral-600 mb-8">
          <a href="/login" className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2">Sign in</a> to leave a review.
        </p>
      )}

      {/* Reviews list */}
      {loading ? (
        <p className="text-neutral-600 text-sm">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-neutral-600 text-sm">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <div key={review._id}>
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-neutral-800 text-neutral-400 text-xs">
                    {review.userName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-neutral-300">{review.userName}</span>
                    <StarRating value={review.rating} />
                    <span className="text-neutral-700 text-xs">{timeAgo(review.createdAt)}</span>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed">{review.body}</p>
                </div>
              </div>
              {i < reviews.length - 1 && <Separator className="bg-neutral-900 mt-6" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
