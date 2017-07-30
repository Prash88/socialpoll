// @flow
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const AuthRoute = ({ component: Component, user, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('auth0IdToken') &&
      localStorage.getItem('auth0IdToken').length > 0
        ? <Component user={user} {...props} />
        : <Redirect to={process.env.PUBLIC_URL + '/'} push />}
  />;

export default withRouter(AuthRoute);
