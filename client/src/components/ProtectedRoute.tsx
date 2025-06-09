import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  allowedRoles: string[]; 
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token') || "12"
  const userRole = localStorage.getItem('role') || "user" || "admin" || "seller"

  
  if (!token) {
    return <Navigate to="/auth" replace />
  }

 
  if (!allowedRoles.includes(userRole || 'user')) {
    return <Navigate to="/auth" replace />
  }

  
  return <Outlet />
}

export default ProtectedRoute
