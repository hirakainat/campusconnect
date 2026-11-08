import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// adminOnly = true  -> only admin can open the page
export default function ProtectedRoute({ children, adminOnly }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />
  return children
}
