// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp.js';
import Login from './Login.js';

const Main = () =>
  <div>
    <Route exact path={process.env.PUBLIC_URL + '/'} component={Login} />
    <Route path={process.env.PUBLIC_URL + '/signup'} component={SignUp} />
  </div>;

export default Main;
