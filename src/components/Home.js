// @flow
import React, { Component } from 'react';

type Props = {
  userName: string
};

class Home extends Component {
  props: Props;

  render() {
    return (
      <div className="alignCenter">
        <h1>
          Welcome to the Social Poll Website! {this.props.userName}
        </h1>
      </div>
    );
  }
}

export default Home;
