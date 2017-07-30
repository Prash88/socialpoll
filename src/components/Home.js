// @flow
import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

type Props = {
  user: Object
};

class Home extends Component {
  props: Props;

  render() {
    const userName = this.props.user ? this.props.user.name : '';
    return (
      <div>
        <Header />
        <div className="alignCenter">
          <h4>
            Welcome to the Social Poll Website! {userName}
          </h4>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
