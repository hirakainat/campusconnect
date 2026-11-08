import { useEffect, useState } from 'react'
import api from '../api.js'

export default function Announcements() {
  const [list, setList] = useState([])

  useEffect(() => {
    api.get('/announcements').then((res) => setList(res.data))
  }, [])

  return (
    <div>
      <h1>Announcements</h1>
      {list.length === 0 && <p>No announcements yet.</p>}
      {list.map((a) => (
        <div className="card" key={a._id}>
          <h3>{a.title}</h3>
          <p>{a.message}</p>
          <small>{new Date(a.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  )
}
