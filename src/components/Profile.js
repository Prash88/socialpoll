// @flow
import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';

type Props = {
  user: Object,
  updateUser: Function
};

type State = {
  name: string,
  email: string,
  emailSubscription: boolean,
  id: string
};

class Profile extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: props.user ? props.user.name : '',
      email: props.user ? props.user.emailAddress : '',
      emailSubscription: props.user ? props.user.emailSubscription : false,
      id: props.user ? props.user.id : ''
    };
  }

  _onSubmit() {
    //console.log(this.state.name);
    //console.log(this.state.email);
    //console.log(this.state.emailSubscription);
    //console.log(this.state.id);
    const variables = {
      id: this.state.id,
      emailAddress: this.state.email,
      name: this.state.name,
      emailSubscription: this.state.emailSubscription
    };
    this.props
      .updateUser({ variables })
      .then(response => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
        window.location.reload();
      });
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      name: props.user ? props.user.name : '',
      email: props.user ? props.user.emailAddress : '',
      emailSubscription: props.user ? props.user.emailSubscription : false,
      id: props.user ? props.user.id : ''
    });
  }

  render() {
    return (
      <div className="alignCenter">
        <h4>Edit & save your profile</h4>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="First Name"
              value={this.state.name}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Last Name"
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="I agree to the Email Subscription"
              checked={this.state.emailSubscription}
              onChange={(e, data) => {
                this.setState({ emailSubscription: data.checked });
              }}
            />
          </Form.Field>
          <Button type="submit" onClick={this._onSubmit.bind(this)}>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

const updateUser = gql`
  mutation(
    $id: ID!
    $name: String!
    $emailAddress: String!
    $emailSubscription: Boolean!
  ) {
    updateUser(
      id: $id
      name: $name
      emailAddress: $emailAddress
      emailSubscription: $emailSubscription
    ) {
      id
    }
  }
`;

export default graphql(updateUser, { name: 'updateUser' })(Profile);
