import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const auth = useAuth();
  const user = useSelector((state) => state.auth.userData);

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <h1>Home: Private route</h1>
      <div>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
      </div>
      <Button
        style={{ width: '15rem', marginTop: '5rem' }}
        fullWidth
        onClick={handleLogOut}
        variant="contained"
        color="primary">
        Log out
      </Button>
    </div>
  );
};

export default Home;
