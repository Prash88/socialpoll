// @flow
import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import NotFound from './NotFound';

type Props = {
  user: Object,
  updateUser: Function
};

type State = {};

class Routes extends Component {
  props: Props;
  state: State;

  render() {
    return (
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          render={defaultProps =>
            <Home {...defaultProps} user={this.props.user} />}
        />
        <Route exact path="/404" component={NotFound} />
        <AuthRoute
          history={this.props.history}
          path={process.env.PUBLIC_URL + '/profile'}
          component={Profile}
        />
        <AuthRoute
          history={this.props.history}
          path={process.env.PUBLIC_URL + '/settings'}
          component={Settings}
        />
        <Redirect to="/404" push />
      </Switch>
    );
  }
}

export default withRouter(Routes);
