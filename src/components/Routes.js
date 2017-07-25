// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';

const Routes = (props: any) =>
  <div>
    <Route
      exact
      path={process.env.PUBLIC_URL + '/'}
      render={defaultProps => <Home {...defaultProps} user={props.user} />}
    />
    <Route
      path={process.env.PUBLIC_URL + '/profile'}
      render={defaultProps => <Profile {...defaultProps} user={props.user} />}
    />
    <Route
      exact
      path={process.env.PUBLIC_URL + '/settings'}
      render={defaultProps => <Settings {...defaultProps} user={props.user} />}
    />
  </div>;

export default Routes;
