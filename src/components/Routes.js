// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home.js';

const Routes = () =>
  <div>
    <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
  </div>;

export default Routes;
