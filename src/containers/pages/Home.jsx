import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const auth = useAuth();
  const user = useSelector((state) => state.authReducer.userData);

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <h1>Home</h1>
      {/* <div>{user[0].name}</div> */}
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
