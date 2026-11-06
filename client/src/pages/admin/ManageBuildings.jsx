import { useEffect, useState } from 'react';
import api from '../../api';

const empty = { name: '', code: '', description: '', floors: 1, mapX: 50, mapY: 50 };

export default function ManageBuildings() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const load = () => api.get('/buildings').then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (editId) await api.put(`/buildings/${editId}`, form);
    else await api.post('/buildings', form);
    setForm(empty); setEditId(null); load();
  };

  const edit = (b) => { setEditId(b._id); setForm(b); };
  const remove = async (id) => {
    if (confirm('Delete this building and all its rooms?')) { await api.delete(`/buildings/${id}`); load(); }
  };

  return (
    <>
      <form onSubmit={submit} className="form">
        <h3>{editId ? 'Edit Building' : 'Add Building'}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={change} required />
        <input name="code" placeholder="Code (e.g. MB)" value={form.code} onChange={change} required />
        <input name="description" placeholder="Description" value={form.description} onChange={change} />
        <div className="row">
          <input name="floors" type="number" placeholder="Floors" value={form.floors} onChange={change} />
          <input name="mapX" type="number" placeholder="Map X (0-100)" value={form.mapX} onChange={change} />
          <input name="mapY" type="number" placeholder="Map Y (0-100)" value={form.mapY} onChange={change} />
        </div>
        <button className="btn">{editId ? 'Update' : 'Add'}</button>
      </form>

      <table>
        <thead><tr><th>Name</th><th>Code</th><th>Floors</th><th>Map (x, y)</th><th></th></tr></thead>
        <tbody>
          {list.map((b) => (
            <tr key={b._id}>
              <td>{b.name}</td><td>{b.code}</td><td>{b.floors}</td><td>{b.mapX}, {b.mapY}</td>
              <td>
                <button className="btn small" onClick={() => edit(b)}>Edit</button>{' '}
                <button className="btn small danger" onClick={() => remove(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
