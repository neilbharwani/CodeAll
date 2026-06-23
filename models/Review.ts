import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  userId: string
  userName: string
  courseId: string
  rating: number
  body: string
  createdAt: Date
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  courseId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  body: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
})

ReviewSchema.index({ userId: 1, courseId: 1 }, { unique: true })

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)
