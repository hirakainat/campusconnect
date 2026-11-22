import express from 'express'
import Room from '../models/Room.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// GET /api/rooms  or  /api/rooms?building=ID
router.get('/', async (req, res) => {
  const filter = req.query.building ? { building: req.query.building } : {}
  res.json(await Room.find(filter).populate('building', 'name'))
})

// admin only
router.post('/', protect, adminOnly, async (req, res) => res.json(await Room.create(req.body)))
router.put('/:id', protect, adminOnly, async (req, res) =>
  res.json(await Room.findByIdAndUpdate(req.params.id, req.body, { new: true }))
)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Room.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
