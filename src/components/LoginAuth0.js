// @flow
import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';

type Props = {
  clientId: String,
  domain: String,
  history: Object
};

type State = {};

class LoginAuth0 extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);
    this._lock = new Auth0Lock(props.clientId, props.domain);
    this.state = {};
  }

  componentDidMount() {
    this._lock.on('authenticated', authResult => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      this._lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }
        // Update DOM
        const variables = {
          idToken: window.localStorage.getItem('auth0IdToken'),
          emailAddress: profile.email,
          name: profile.name,
          emailSubscription: true
        };

        this.props
          .createUser({ variables })
          .then(response => {
            this.props.history.replace(process.env.PUBLIC_URL + '/');
            window.location.reload();
          })
          .catch(e => {
            this.props.history.replace(process.env.PUBLIC_URL + '/');
            window.location.reload();
          });
      });
      //this.props.history.push(`/signup`)
    });
  }

  _showLogin = () => {
    this._lock.show();
  };

  render() {
    return (
      <Button primary size="huge" onClick={this._showLogin}>
        Login
      </Button>
    );
  }
}

const createUser = gql`
  mutation(
    $idToken: String!
    $name: String!
    $emailAddress: String!
    $emailSubscription: Boolean!
  ) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      name: $name
      emailAddress: $emailAddress
      emailSubscription: $emailSubscription
    ) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;
export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
    withRouter(LoginAuth0)
  )
);
