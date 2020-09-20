import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/atoms';

const Routes = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
