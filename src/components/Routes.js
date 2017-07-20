// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import App from './App.js';

const Routes = () =>
  <div>
    <Route exact path={process.env.PUBLIC_URL + '/'} component={App} />
  </div>;

export default Routes;
