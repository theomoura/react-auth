import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../hooks/useAuth';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
  },
});

const Routes = () => {
  const { isLoggedIn, loading } = useAuth();
  const classes = useStyles();
  console.log('loading', loading);

  if (loading) {
    return (
      <div className={classes.container}>
        <CircularProgress />
      </div>
    );
  }

  return isLoggedIn ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
