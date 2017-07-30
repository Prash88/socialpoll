// @flow
import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

type Props = {
  history: Object
};

type State = {};

class NotFound extends Component {
  props: Props;
  state: State;
  render() {
    return (
      <div>
        <Header />
        <div className="alignCenter">
          <h1>That happens not to be a page</h1>
          <br />
          <Button.Group className="alignCenterHorizontal">
            <Button onClick={this.props.history.goBack}>Go Back</Button>
            <Button.Or />
            <Button
              onClick={() => {
                this.props.history.push(process.env.PUBLIC_URL + '/');
              }}
            >
              Home
            </Button>
          </Button.Group>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(NotFound);
