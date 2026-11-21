import express from 'express'
import Building from '../models/Building.js'
import Room from '../models/Room.js'

const router = express.Router()

// GET /api/search?q=library
router.get('/', async (req, res) => {
  const q = req.query.q || ''
  const buildings = await Building.find({ name: { $regex: q, $options: 'i' } })
  const rooms = await Room.find({ roomNumber: { $regex: q, $options: 'i' } }).populate('building', 'name')
  res.json({ buildings, rooms })
})

export default router
