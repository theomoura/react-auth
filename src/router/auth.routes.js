import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../containers/pages';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
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

export default AuthRoutes;
