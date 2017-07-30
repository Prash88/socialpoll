// @flow
import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

type Props = {
  user: Object
};

class Settings extends Component {
  props: Props;

  render() {
    return (
      <div>
        <Header />
        <div className="alignCenter">
          <h4>Settings page</h4>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Settings;
