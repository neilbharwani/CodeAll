import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  avatar?: string
  points: number
  level: string
  streak: number
  lastActive: Date
  enrolledCourses: string[]
  completedLessons: string[]
  badges: string[]
  provider?: string
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String, default: '' },
  points: { type: Number, default: 0 },
  level: { type: String, default: 'Beginner' },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  enrolledCourses: [{ type: String }],
  completedLessons: [{ type: String }],
  badges: [{ type: String }],
  provider: { type: String, default: 'credentials' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
