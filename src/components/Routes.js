// @flow
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';

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
      <div>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          render={defaultProps =>
            <Home {...defaultProps} user={this.props.user} />}
        />
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
      </div>
    );
  }
}

export default withRouter(Routes);
