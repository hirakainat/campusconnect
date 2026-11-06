import { useState } from 'react';
import ManageBuildings from './ManageBuildings';
import ManageRooms from './ManageRooms';
import ManageAnnouncements from './ManageAnnouncements';
import ManageIssues from './ManageIssues';

const TABS = {
  Buildings: ManageBuildings,
  Rooms: ManageRooms,
  Announcements: ManageAnnouncements,
  Issues: ManageIssues,
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('Buildings');
  const Active = TABS[tab];

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div className="filters">
        {Object.keys(TABS).map((t) => (
          <button key={t} className={`btn ${tab === t ? '' : 'outline'}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <Active />
    </>
  );
}
