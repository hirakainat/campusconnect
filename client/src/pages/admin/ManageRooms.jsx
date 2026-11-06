import { useEffect, useState } from 'react';
import api from '../../api';

const empty = { building: '', roomNumber: '', floor: 0, type: 'classroom', capacity: 30 };

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [form, setForm] = useState(empty);

  const load = () => api.get('/rooms').then((r) => setRooms(r.data));
  useEffect(() => { load(); api.get('/buildings').then((r) => setBuildings(r.data)); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/rooms', form);
    setForm(empty); load();
  };

  const toggle = async (r) => {
    await api.put(`/rooms/${r._id}`, { status: r.status === 'available' ? 'occupied' : 'available' });
    load();
  };
  const remove = async (id) => { if (confirm('Delete this room?')) { await api.delete(`/rooms/${id}`); load(); } };

  return (
    <>
      <form onSubmit={submit} className="form">
        <h3>Add Room</h3>
        <select name="building" value={form.building} onChange={change} required>
          <option value="">Select building</option>
          {buildings.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
        <input name="roomNumber" placeholder="Room number" value={form.roomNumber} onChange={change} required />
        <div className="row">
          <input name="floor" type="number" placeholder="Floor" value={form.floor} onChange={change} />
          <select name="type" value={form.type} onChange={change}>
            <option>classroom</option><option>lab</option><option>office</option><option>other</option>
          </select>
          <input name="capacity" type="number" placeholder="Capacity" value={form.capacity} onChange={change} />
        </div>
        <button className="btn">Add</button>
      </form>

      <table>
        <thead><tr><th>Building</th><th>Room</th><th>Type</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r._id}>
              <td>{r.building?.name}</td><td>{r.roomNumber}</td><td>{r.type}</td>
              <td><span className={`badge ${r.status}`}>{r.status}</span></td>
              <td>
                <button className="btn small" onClick={() => toggle(r)}>Toggle status</button>{' '}
                <button className="btn small danger" onClick={() => remove(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
