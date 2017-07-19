import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

class App extends Component {
  render() {
    return (
      <div>
       <Header />
       <Main />
       <Footer />
     </div>
    );
  }
}

export default App;
