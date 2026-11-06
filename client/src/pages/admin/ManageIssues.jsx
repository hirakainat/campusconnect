import { useEffect, useState } from 'react';
import api from '../../api';

export default function ManageIssues() {
  const [issues, setIssues] = useState([]);
  const load = () => api.get('/issues').then((r) => setIssues(r.data));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => { await api.put(`/issues/${id}`, { status }); load(); };
  const remove = async (id) => { if (confirm('Delete this report?')) { await api.delete(`/issues/${id}`); load(); } };

  return (
    <table>
      <thead><tr><th>Title</th><th>Details</th><th>Reported by</th><th>Building</th><th>Status</th><th></th></tr></thead>
      <tbody>
        {issues.map((i) => (
          <tr key={i._id}>
            <td>{i.title}</td>
            <td>{i.description}{i.room && ` (Room: ${i.room})`}</td>
            <td>{i.user?.name}</td>
            <td>{i.building?.name || '-'}</td>
            <td>
              <select value={i.status} onChange={(e) => setStatus(i._id, e.target.value)}>
                <option>pending</option><option>in-progress</option><option>resolved</option>
              </select>
            </td>
            <td><button className="btn small danger" onClick={() => remove(i._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
