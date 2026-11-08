import { useEffect, useState } from 'react'
import api from '../api.js'

export default function ReportIssue() {
  const [form, setForm] = useState({ title: '', description: '', location: '' })
  const [myIssues, setMyIssues] = useState([])

  const loadIssues = () => api.get('/issues/mine').then((res) => setMyIssues(res.data))

  useEffect(() => {
    loadIssues()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/issues', form)
    setForm({ title: '', description: '', location: '' })
    loadIssues()
  }

  return (
    <div>
      <h1>Report an Issue</h1>
      <form className="card form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title (e.g. Broken projector)" value={form.title} onChange={handleChange} required />
        <input name="location" placeholder="Location (e.g. CS-201)" value={form.location} onChange={handleChange} />
        <textarea name="description" placeholder="Describe the problem" value={form.description} onChange={handleChange} required />
        <button>Submit</button>
      </form>

      <h3>My reports</h3>
      {myIssues.map((i) => (
        <div className="card row" key={i._id}>
          <div>
            <b>{i.title}</b> {i.location && '– ' + i.location}
          </div>
          <span className={'badge ' + i.status}>{i.status}</span>
        </div>
      ))}
    </div>
  )
}
