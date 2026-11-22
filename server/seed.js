// Run once:  npm run seed   (adds admin + sample buildings and rooms)
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import Building from './models/Building.js'
import Room from './models/Room.js'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

await User.deleteMany()
await Building.deleteMany()
await Room.deleteMany()

await User.create({
  name: 'Admin',
  email: 'admin@campus.com',
  password: await bcrypt.hash('admin123', 10),
  role: 'admin',
})

const library = await Building.create({ name: 'Library', description: 'Books and quiet study areas', mapX: 20, mapY: 25 })
const cs = await Building.create({ name: 'CS Block', description: 'Computer science labs and classrooms', mapX: 60, mapY: 30 })
const cafe = await Building.create({ name: 'Cafeteria', description: 'Food and hangout area', mapX: 40, mapY: 70 })

await Room.create([
  { building: library._id, roomNumber: 'L-101', floor: 1, type: 'Reading Hall', status: 'available' },
  { building: library._id, roomNumber: 'L-102', floor: 1, type: 'Study Room', status: 'occupied' },
  { building: cs._id, roomNumber: 'CS-201', floor: 2, type: 'Lab', status: 'available' },
  { building: cs._id, roomNumber: 'CS-202', floor: 2, type: 'Classroom', status: 'occupied' },
  { building: cafe._id, roomNumber: 'C-001', floor: 0, type: 'Dining Hall', status: 'available' },
])

console.log('Done! Admin login: admin@campus.com / admin123')
process.exit()
