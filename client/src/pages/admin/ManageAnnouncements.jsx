import { useEffect, useState } from 'react';
import api from '../../api';

export default function ManageAnnouncements() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', message: '' });
  const [editId, setEditId] = useState(null);

  const load = () => api.get('/announcements').then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editId) await api.put(`/announcements/${editId}`, form);
    else await api.post('/announcements', form);
    setForm({ title: '', message: '' }); setEditId(null); load();
  };

  const edit = (a) => { setEditId(a._id); setForm({ title: a.title, message: a.message }); };
  const remove = async (id) => { if (confirm('Delete announcement?')) { await api.delete(`/announcements/${id}`); load(); } };

  return (
    <>
      <form onSubmit={submit} className="form">
        <h3>{editId ? 'Edit Announcement' : 'New Announcement'}</h3>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button className="btn">{editId ? 'Update' : 'Post'}</button>
      </form>

      {list.map((a) => (
        <div key={a._id} className="card">
          <h3>{a.title}</h3>
          <p>{a.message}</p>
          <button className="btn small" onClick={() => edit(a)}>Edit</button>{' '}
          <button className="btn small danger" onClick={() => remove(a._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
