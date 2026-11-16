import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  roomNumber: { type: String, required: true },
  floor: { type: Number, default: 0 },
  type: { type: String, default: 'Classroom' },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
})

export default mongoose.model('Room', roomSchema)
