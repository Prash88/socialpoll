import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import Header from './Header.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
    /*
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    */
  }
}

export default App;
