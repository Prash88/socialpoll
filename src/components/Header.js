// @flow
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/Header.css';
import { Menu } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import Auth0Lock from 'auth0-lock';

const clientId = 'GAbreu5mFYaHusGFGuCTBPVOtaeN77qz';
const domain = 'prash88.auth0.com';

type Props = {
  data: Object,
  createUser: Function
};

type State = {};

class Header extends Component {
  props: Props;
  state: State;
  _lock: any;

  constructor(props) {
    super(props);
    this._lock = new Auth0Lock(clientId, domain);
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
        // Update User Details
        const variables = {
          idToken: window.localStorage.getItem('auth0IdToken'),
          emailAddress: profile.email,
          name: profile.name,
          emailSubscription: true
        };

        this.props
          .createUser({ variables })
          .then(response => {
            this.props.data.refetch();
          })
          .catch(e => {
            this.props.data.refetch();
          });
      });
    });
  }

  _showLogin = () => {
    this._lock.show();
  };

  _logout = () => {
    window.localStorage.removeItem('auth0IdToken');
    this.props.data.refetch();
  };

  _isLoggedIn = () => {
    return this.props.data.user;
  };

  logInItem() {
    return <Menu.Item onClick={this._showLogin}>Log In</Menu.Item>;
  }

  logOutItem() {
    return <Menu.Item onClick={this._logout}>Log Out</Menu.Item>;
  }

  loadingItem() {
    return <Menu.Item onClick={() => {}}>Loading ....</Menu.Item>;
  }

  getMenuItem() {
    if (this.props.data.loading) {
      return this.loadingItem();
    } else if (!this._isLoggedIn()) {
      return this.logInItem();
    } else {
      return this.logOutItem();
    }
  }

  render() {
    return (
      <Menu>
        <Menu.Menu>
          <Menu.Item
            onClick={() => {
              this.props.history.push(process.env.PUBLIC_URL + '/');
            }}
          >
            Social Poll <img src={logo} alt="logo" className="Header-logo" />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          {this.getMenuItem()}
        </Menu.Menu>
      </Menu>
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
  query userQuery {
    user {
      id
    }
  }
`;

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(Header)
);
