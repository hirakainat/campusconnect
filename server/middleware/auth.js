import jwt from 'jsonwebtoken'

// user must be logged in
export const protect = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'Please login first' })
  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// user must be admin
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
  next()
}
