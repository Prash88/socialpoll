import React from 'react';
import Home from './Home.js';
import { Switch, Route } from 'react-router-dom';
import SignUp from './SignUp.js';
import Login from './Login.js';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main;
