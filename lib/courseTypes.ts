export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  videoFile: string
  duration: string
  durationSeconds: number
  points: number
  order?: number
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  icon: string
  prerequisites: string[]
  whatYouLearn: string[]
  lessons: Lesson[]
  totalPoints: number
}
