import express from 'express'
import Announcement from '../models/Announcement.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// everyone can view (newest first)
router.get('/', async (req, res) => res.json(await Announcement.find().sort({ createdAt: -1 })))

// admin only
router.post('/', protect, adminOnly, async (req, res) => res.json(await Announcement.create(req.body)))
router.put('/:id', protect, adminOnly, async (req, res) =>
  res.json(await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true }))
)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
