// @flow
import React, { Component } from 'react';

type Props = {
  user: Object
};

class Home extends Component {
  props: Props;

  render() {
    const userName = this.props.user ? this.props.user.name : '';
    return (
      <div className="alignCenter">
        <h4>
          Welcome to the Social Poll Website! {userName}
        </h4>
      </div>
    );
  }
}

export default Home;
