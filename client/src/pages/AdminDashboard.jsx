import { useState } from 'react'
import AdminBuildings from './admin/AdminBuildings.jsx'
import AdminRooms from './admin/AdminRooms.jsx'
import AdminAnnouncements from './admin/AdminAnnouncements.jsx'
import AdminIssues from './admin/AdminIssues.jsx'

export default function AdminDashboard() {
  const [tab, setTab] = useState('buildings')

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        {['buildings', 'rooms', 'announcements', 'issues'].map((t) => (
          <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'buildings' && <AdminBuildings />}
      {tab === 'rooms' && <AdminRooms />}
      {tab === 'announcements' && <AdminAnnouncements />}
      {tab === 'issues' && <AdminIssues />}
    </div>
  )
}
