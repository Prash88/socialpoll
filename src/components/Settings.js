// @flow
import React, { Component } from 'react';

type Props = {
  user: Object
};

class Settings extends Component {
  props: Props;

  render() {
    return (
      <div className="alignCenter">
        <h4>Settings page</h4>
      </div>
    );
  }
}

export default Settings;
