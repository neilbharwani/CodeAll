import mongoose, { Schema, Document } from 'mongoose'

export interface IProgress extends Document {
  userId: string
  courseId: string
  lessonId: string
  completed: boolean
  watchTime: number
  completedAt?: Date
}

const ProgressSchema = new Schema<IProgress>({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  watchTime: { type: Number, default: 0 },
  completedAt: { type: Date },
})

ProgressSchema.index({ userId: 1, courseId: 1, lessonId: 1 }, { unique: true })

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema)
