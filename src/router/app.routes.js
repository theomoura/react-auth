import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../containers/pages';
import PrivateRoute from './PrivateRoute';

const AuthenticatedRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login">
        <Redirect to={{ pathname: '/' }} />
      </Route>
      <Route path="/ops" component={() => <h1>Page not found</h1>} />
      <Route path="*">
        <Redirect
          to={{
            pathname: '/ops',
            state: { referrer: window && window.location.href, message: '404' },
          }}
        />
      </Route>
    </Switch>
  );
};

export default AuthenticatedRoutes;
