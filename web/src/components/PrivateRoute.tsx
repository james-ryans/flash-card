import { Navigate, Outlet } from 'react-router';
import React from 'react';
import { useAuth } from '../contexts/auth';

function PrivateRoute(): React.ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
