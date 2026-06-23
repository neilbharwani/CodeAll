export function getLevel(points: number): string {
  if (points >= 1000) return 'Master'
  if (points >= 601) return 'Creator'
  if (points >= 301) return 'Builder'
  if (points >= 101) return 'Explorer'
  return 'Beginner'
}

export function getLevelProgress(points: number) {
  const levels = [
    { name: 'Beginner', min: 0 },
    { name: 'Explorer', min: 101 },
    { name: 'Builder', min: 301 },
    { name: 'Creator', min: 601 },
    { name: 'Master', min: 1000 },
  ]
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].min) {
      const next = levels[i + 1]
      if (!next) return { level: 'Master', progress: 100, nextLevel: 'Master', pointsToNext: 0 }
      const progress = Math.round(((points - levels[i].min) / (next.min - levels[i].min)) * 100)
      return { level: levels[i].name, progress, nextLevel: next.name, pointsToNext: next.min - points }
    }
  }
  return { level: 'Beginner', progress: 0, nextLevel: 'Explorer', pointsToNext: 101 }
}
