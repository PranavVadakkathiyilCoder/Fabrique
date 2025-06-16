import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { validateUser } from '../apis/authapi';

interface ProtectedRouteProps {
  allowedRoles: string[]; 
}


const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
   
  useEffect(() => {
      const ValidateUser = async () => {
        const res = await validateUser();
          console.log("Validation success:", res.data.success);
        //try {
        //  const res = await validateUser();
        //  console.log("Validation success:", res.data.success);
        //} catch (error) {
          
        //  console.log(error);
          
        //}
      };
  
      ValidateUser();
    }, []);
  const token = localStorage.getItem('token') 
  const userRole = localStorage.getItem('role') 

  
  if (!token) {
    return <Navigate to="/auth" replace />
  }

 
  if (!allowedRoles.includes(userRole || '')) {
    return <Navigate to="/auth" replace />
  }
   
  
  return <Outlet />
}

export default ProtectedRoute
