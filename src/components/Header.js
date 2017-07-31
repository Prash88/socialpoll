// @flow
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import '../css/Header.css';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';

const clientId = 'GAbreu5mFYaHusGFGuCTBPVOtaeN77qz';
const domain = 'prash88.auth0.com';

type Props = {
  data: Object,
  createUser: Function,
  match: Object,
  location: Object,
  history: Object
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
    this.props.history.push(process.env.PUBLIC_URL + '/');
    this.props.data.refetch();
  };

  _isLoggedIn = () => {
    return this.props.data.user;
  };

  logInItem() {
    return <Menu.Item onClick={this._showLogin}>Log In</Menu.Item>;
  }

  logOutItem() {
    const trigger = (
      <div>
        <Image src={avatar} avatar />
        <span>
          {this.props.data.user.name}
        </span>
      </div>
    );
    return (
      <Menu.Item>
        <Dropdown trigger={trigger} pointing="top right" icon={null}>
          <Dropdown.Menu>
            <Dropdown.Header
              content={
                <span>
                  Signed in as <strong>{this.props.data.user.name}</strong>
                </span>
              }
            />
            <Dropdown.Item
              key={'profile'}
              text={'Your Profile'}
              onClick={() => {
                this.props.history.push(process.env.PUBLIC_URL + '/profile');
              }}
            />
            <Dropdown.Item
              key={'settings'}
              text={'Settings'}
              onClick={() => {
                this.props.history.push(process.env.PUBLIC_URL + '/settings');
              }}
            />
            <Dropdown.Item
              key={'sign-out'}
              text={'Sign Out'}
              onClick={this._logout}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
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
      <div>
        <Menu>
          <Menu.Menu>
            <Menu.Item
              onClick={() => {
                this.props.history.push(process.env.PUBLIC_URL + '/');
              }}
            >
              <div className="headerWrapper">
                <div style={{ paddingTop: 5 }}>
                  <h4>Social Poll</h4>
                </div>
                <img src={logo} alt="logo" className="Header-logo" />
              </div>
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            {this.getMenuItem()}
          </Menu.Menu>
        </Menu>
      </div>
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
      name
      emailAddress
      emailSubscription
    }
  }
`;

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
    withRouter(Header)
  )
);
