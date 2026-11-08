import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'
import CampusMap from '../components/CampusMap.jsx'

export default function Home() {
  const [buildings, setBuildings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/buildings').then((res) => setBuildings(res.data))
  }, [])

  return (
    <div>
      <h1>Campus Map</h1>
      <p>Click a block to see its rooms.</p>
      <CampusMap buildings={buildings} onBuildingClick={(id) => navigate('/building/' + id)} />
    </div>
  )
}