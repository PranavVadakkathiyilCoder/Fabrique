import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateUser } from '../apis/authapi';

const PublicRoute = () => {
  useEffect(() => {
    const ValidateUser = async () => {
      try {
        const res = await validateUser();
        console.log("Validation success:", res.data.success);
      } catch (error) {
        localStorage.clear();
        console.log(error);
        
      }
    };

    ValidateUser();
  }, []);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'seller') return <Navigate to="/store" replace />;
    if (role === 'user') return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
