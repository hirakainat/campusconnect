import { useEffect, useState } from 'react'
import api from '../../api.js'

const empty = { title: '', message: '' }

export default function AdminAnnouncements() {
  const [list, setList] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)

  const load = () => api.get('/announcements').then((res) => setList(res.data))
  useEffect(() => {
    load()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) await api.put('/announcements/' + editId, form)
    else await api.post('/announcements', form)
    setForm(empty)
    setEditId(null)
    load()
  }

  const handleEdit = (a) => {
    setEditId(a._id)
    setForm({ title: a.title, message: a.message })
  }

  const handleDelete = async (id) => {
    await api.delete('/announcements/' + id)
    load()
  }

  return (
    <div>
      <form className="card form" onSubmit={handleSubmit}>
        <h3>{editId ? 'Edit announcement' : 'Add announcement'}</h3>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button>{editId ? 'Update' : 'Post'}</button>
      </form>

      {list.map((a) => (
        <div className="card row" key={a._id}>
          <span>{a.title}</span>
          <div>
            <button onClick={() => handleEdit(a)}>Edit</button>
            <button className="danger" onClick={() => handleDelete(a._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
