import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const makeToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

// POST /api/auth/register  (always creates a student)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already used' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    res.json({ token: makeToken(user), user: { id: user._id, name: user.name, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Wrong email or password' })
    res.json({ token: makeToken(user), user: { id: user._id, name: user.name, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
