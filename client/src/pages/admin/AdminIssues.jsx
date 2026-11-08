import { useEffect, useState } from 'react'
import api from '../../api.js'

export default function AdminIssues() {
  const [issues, setIssues] = useState([])

  const load = () => api.get('/issues').then((res) => setIssues(res.data))
  useEffect(() => {
    load()
  }, [])

  const changeStatus = async (id, status) => {
    await api.put('/issues/' + id, { status })
    load()
  }

  const handleDelete = async (id) => {
    await api.delete('/issues/' + id)
    load()
  }

  return (
    <div>
      {issues.length === 0 && <p>No issues reported.</p>}
      {issues.map((i) => (
        <div className="card" key={i._id}>
          <b>{i.title}</b> {i.location && '– ' + i.location}
          <p>{i.description}</p>
          <small>By {i.user?.name} ({i.user?.email})</small>
          <div className="row">
            <select value={i.status} onChange={(e) => changeStatus(i._id, e.target.value)}>
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="resolved">resolved</option>
            </select>
            <button className="danger" onClick={() => handleDelete(i._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
