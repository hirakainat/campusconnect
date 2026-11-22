import express from 'express'
import Building from '../models/Building.js'
import Room from '../models/Room.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// everyone can view
router.get('/', async (req, res) => res.json(await Building.find()))
router.get('/:id', async (req, res) => res.json(await Building.findById(req.params.id)))

// admin only
router.post('/', protect, adminOnly, async (req, res) => res.json(await Building.create(req.body)))
router.put('/:id', protect, adminOnly, async (req, res) =>
  res.json(await Building.findByIdAndUpdate(req.params.id, req.body, { new: true }))
)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Room.deleteMany({ building: req.params.id }) // delete its rooms too
  await Building.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
