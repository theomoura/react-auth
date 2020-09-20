import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../containers/pages';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path={'/login'} component={Login} />
      <Route path="*">
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      </Route>
    </Switch>
  );
};

export default AuthRoutes;
