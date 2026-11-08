import { useEffect, useState } from 'react'
import api from '../../api.js'

const empty = { name: '', description: '', mapX: 50, mapY: 50 }

export default function AdminBuildings() {
  const [list, setList] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)

  const load = () => api.get('/buildings').then((res) => setList(res.data))
  useEffect(() => {
    load()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) await api.put('/buildings/' + editId, form)
    else await api.post('/buildings', form)
    setForm(empty)
    setEditId(null)
    load()
  }

  const handleEdit = (b) => {
    setEditId(b._id)
    setForm({ name: b.name, description: b.description, mapX: b.mapX, mapY: b.mapY })
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this building and its rooms?')) {
      await api.delete('/buildings/' + id)
      load()
    }
  }

  return (
    <div>
      <form className="card form" onSubmit={handleSubmit}>
        <h3>{editId ? 'Edit building' : 'Add building'}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="mapX" type="number" placeholder="Map X % (0-100)" value={form.mapX} onChange={handleChange} />
        <input name="mapY" type="number" placeholder="Map Y % (0-100)" value={form.mapY} onChange={handleChange} />
        <button>{editId ? 'Update' : 'Add'}</button>
      </form>

      {list.map((b) => (
        <div className="card row" key={b._id}>
          <span>{b.name}</span>
          <div>
            <button onClick={() => handleEdit(b)}>Edit</button>
            <button className="danger" onClick={() => handleDelete(b._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
