// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp.js';
import Login from './Login.js';

const Main = () =>
  <div>
    <Route exact path="/" component={Login} />
    <Route path="/signup" component={SignUp} />
  </div>;

export default Main;
