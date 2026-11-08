import { useEffect, useState } from 'react'
import api from '../../api.js'

const empty = { building: '', roomNumber: '', floor: 0, type: 'Classroom', status: 'available' }

export default function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [buildings, setBuildings] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)

  const load = () => api.get('/rooms').then((res) => setRooms(res.data))
  useEffect(() => {
    load()
    api.get('/buildings').then((res) => setBuildings(res.data))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) await api.put('/rooms/' + editId, form)
    else await api.post('/rooms', form)
    setForm(empty)
    setEditId(null)
    load()
  }

  const handleEdit = (r) => {
    setEditId(r._id)
    setForm({ building: r.building._id, roomNumber: r.roomNumber, floor: r.floor, type: r.type, status: r.status })
  }

  const handleDelete = async (id) => {
    await api.delete('/rooms/' + id)
    load()
  }

  return (
    <div>
      <form className="card form" onSubmit={handleSubmit}>
        <h3>{editId ? 'Edit room' : 'Add room'}</h3>
        <select name="building" value={form.building} onChange={handleChange} required>
          <option value="">Select building</option>
          {buildings.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
        <input name="roomNumber" placeholder="Room number" value={form.roomNumber} onChange={handleChange} required />
<input name="floor" type="number" min="0" placeholder="Floor (0 = ground)" value={form.floor} onChange={handleChange} />        <input name="type" placeholder="Type (Lab, Classroom...)" value={form.type} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="available">available</option>
          <option value="occupied">occupied</option>
        </select>
        <button>{editId ? 'Update' : 'Add'}</button>
      </form>

      {rooms.map((r) => (
        <div className="card row" key={r._id}>
          <span>
            {r.roomNumber} ({r.building?.name}) <span className={'badge ' + r.status}>{r.status}</span>
          </span>
          <div>
            <button onClick={() => handleEdit(r)}>Edit</button>
            <button className="danger" onClick={() => handleDelete(r._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
