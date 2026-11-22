import express from 'express'
import Issue from '../models/Issue.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// student reports an issue
router.post('/', protect, async (req, res) => {
  const { title, description, location } = req.body
  res.json(await Issue.create({ title, description, location, user: req.user.id }))
})

// student sees own issues
router.get('/mine', protect, async (req, res) =>
  res.json(await Issue.find({ user: req.user.id }).sort({ createdAt: -1 }))
)

// admin sees all issues
router.get('/', protect, adminOnly, async (req, res) =>
  res.json(await Issue.find().populate('user', 'name email').sort({ createdAt: -1 }))
)

// admin updates status
router.put('/:id', protect, adminOnly, async (req, res) =>
  res.json(await Issue.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }))
)

router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
