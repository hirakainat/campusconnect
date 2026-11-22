import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './routes/auth.js'
import buildingRoutes from './routes/buildings.js'
import roomRoutes from './routes/rooms.js'
import issueRoutes from './routes/issues.js'
import announcementRoutes from './routes/announcements.js'
import searchRoutes from './routes/search.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/buildings', buildingRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/issues', issueRoutes)
app.use('/api/announcements', announcementRoutes)
app.use('/api/search', searchRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () => console.log('Server running'))
  })
  .catch((err) => console.log(err.message))
