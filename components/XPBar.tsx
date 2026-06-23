'use client'

import { Progress } from '@/components/ui/progress'
import { getLevelProgress } from '@/lib/levels'

interface XPBarProps {
  points: number
}

export default function XPBar({ points }: XPBarProps) {
  const { level, progress, nextLevel, pointsToNext } = getLevelProgress(points)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-neutral-300 font-medium">{level}</span>
        {nextLevel !== level && (
          <span className="text-neutral-600">{pointsToNext} XP to {nextLevel}</span>
        )}
      </div>
      <Progress value={progress} className="h-1.5 bg-neutral-800 [&>*]:bg-white" />
      <div className="text-right text-xs text-neutral-600">{points} XP</div>
    </div>
  )
}
