import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="App-header">
          <img src={logo} className="Header-logo" alt="logo" />
          <h4>Social Poll</h4>
        </div>
      </div>
    );
  }
}
