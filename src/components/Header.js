// @flow
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/Header.css';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Header extends Component {
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
          <Menu.Item
            onClick={() => {
              this.props.history.push(process.env.PUBLIC_URL + '/signup');
            }}
          >
            Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Header);
