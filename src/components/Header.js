import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/Header.css';
import { Menu } from 'semantic-ui-react';

export default class Header extends Component {
  render() {
    return (
      <Menu>
        <Menu.Menu>
          <Menu.Item onClick={() => {}}>
            Social Poll <img src={logo} alt="logo" className="Header-logo" />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item onClick={() =>{}}>
            Sign Up
          </Menu.Item>
          <Menu.Item onClick={() => {}}>
            Login
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
