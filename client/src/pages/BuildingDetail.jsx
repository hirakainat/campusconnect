import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api.js'

export default function BuildingDetail() {
  const { id } = useParams()
  const [building, setBuilding] = useState(null)
  const [rooms, setRooms] = useState([])
  const [floor, setFloor] = useState('all')

  useEffect(() => {
    api.get('/buildings/' + id).then((res) => setBuilding(res.data))
    api.get('/rooms?building=' + id).then((res) => setRooms(res.data))
  }, [id])

  if (!building) return <p>Loading...</p>

  const floors = [...new Set(rooms.map((r) => r.floor))].sort((a, b) => a - b)
  const shown = floor === 'all' ? rooms : rooms.filter((r) => r.floor === Number(floor))

  return (
    <div>
      <Link to="/">← Back to map</Link>
      <h1>{building.name}</h1>
      <p>{building.description}</p>

      <div className="row">
        <h3>Rooms ({shown.length})</h3>
        <select value={floor} onChange={(e) => setFloor(e.target.value)}>
          <option value="all">All floors</option>
          {floors.map((f) => (
            <option key={f} value={f}>Floor {f}</option>
          ))}
        </select>
      </div>

      {shown.length === 0 && <p>No rooms added yet.</p>}
      {shown.map((r) => (
        <div className="card row" key={r._id}>
          <div>
            <b>{r.roomNumber}</b> – {r.type} (Floor {r.floor})
          </div>
          <span className={'badge ' + r.status}>{r.status}</span>
        </div>
      ))}
    </div>
  )
}