import mongoose from 'mongoose'

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  mapX: { type: Number, default: 50 }, // position on map in % (0-100)
  mapY: { type: Number, default: 50 },
})

export default mongoose.model('Building', buildingSchema)
