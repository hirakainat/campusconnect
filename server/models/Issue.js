import mongoose from 'mongoose'

const issueSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Issue', issueSchema)
