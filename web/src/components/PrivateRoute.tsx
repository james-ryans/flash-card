import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/auth';

function PrivateRoute() {
  const { user, verify } = useAuth();

  verify();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
