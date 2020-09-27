import React from 'react';
import UnauthenticatedRoutes from './auth.routes';
import AuthenticatedRoutes from './app.routes';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/atoms';

const Routes = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};

export default Routes;
