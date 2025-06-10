import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'seller') return <Navigate to="/store" replace />;
    if (role === 'user') return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default PublicRoute