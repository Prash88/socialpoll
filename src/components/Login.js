// @flow
import React, { Component } from 'react';
import { Button, Loader } from 'semantic-ui-react';
import '../css/App.css';
import LoginAuth0 from './LoginAuth0';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const clientId = 'GAbreu5mFYaHusGFGuCTBPVOtaeN77qz';
const domain = 'prash88.auth0.com';

type Props = {
  history: Object,
  data: Object
};

class Login extends Component {
  props: Props;

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('email');
    window.location.reload();
  };

  _isLoggedIn = () => {
    return this.props.data.user;
  };

  renderLoggedIn() {
    return (
      <div className="alignCenter">
        <Button primary size="huge" onClick={this._logout}>
          Log Out
        </Button>
      </div>
    );
  }

  renderLoggedOut() {
    //<Button primary size='huge' onClick={() => {}}>Login</Button>
    return (
      <div className="alignCenter">
        <LoginAuth0 clientId={clientId} domain={domain} />
      </div>
    );
  }

  render() {
    if (this.props.data.loading) {
      return <Loader inverted />;
    }
    if (this._isLoggedIn()) {
      return this.renderLoggedIn();
    } else {
      return this.renderLoggedOut();
    }
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
  withRouter(Login)
);
