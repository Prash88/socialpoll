// @flow
import React from 'react';

const Profile = (props: any) =>
  <div className="alignCenter">
    <h4>
      {props.user && props.user.name}
    </h4>
    <h4>
      {props.user && props.user.emailAddress}
    </h4>
    <h4>
      {props.user && props.user.emailSubscription && 'true'}
    </h4>
  </div>;

export default Profile;
