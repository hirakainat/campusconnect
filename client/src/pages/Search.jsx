import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api.js'

export default function Search() {
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await api.get('/search?q=' + q)
    setResult(res.data)
  }

  return (
    <div>
      <h1>Search</h1>
      <form className="row" onSubmit={handleSearch}>
        <input placeholder="Search building or room..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button>Search</button>
      </form>

      {result && (
        <>
          <h3>Buildings</h3>
          {result.buildings.length === 0 && <p>No buildings found.</p>}
          {result.buildings.map((b) => (
            <div className="card" key={b._id}>
              <Link to={'/building/' + b._id}>{b.name}</Link>
            </div>
          ))}

          <h3>Rooms</h3>
          {result.rooms.length === 0 && <p>No rooms found.</p>}
          {result.rooms.map((r) => (
            <div className="card row" key={r._id}>
              <Link to={'/building/' + r.building._id}>
                {r.roomNumber} ({r.building.name})
              </Link>
              <span className={'badge ' + r.status}>{r.status}</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
