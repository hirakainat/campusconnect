import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h2>CampusConnect</h2>
      <div className="links">
        <Link to="/">Map</Link>
        <Link to="/search">Search</Link>
        <Link to="/announcements">Announcements</Link>
        {user && user.role === 'student' && <Link to="/report">Report Issue</Link>}
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user ? (
          <button onClick={handleLogout}>Logout ({user.name})</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
