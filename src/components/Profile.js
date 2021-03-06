// @flow
import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import Header from './Header.js';
import Footer from './Footer.js';

type Props = {
  data: Object,
  updateUser: Function
};

type State = {
  name: string,
  email: string,
  emailSubscription: boolean,
  id: string,
  saveEnabled: boolean
};

class Profile extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      emailSubscription: false,
      id: '',
      saveEnabled: false
    };
  }

  _onSubmit() {
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
      name: props.data.user ? props.data.user.name : '',
      email: props.data.user ? props.data.user.emailAddress : '',
      emailSubscription: props.data.user
        ? props.data.user.emailSubscription
        : false,
      id: props.data.user ? props.data.user.id : ''
    });
  }

  nameChange(e) {
    const name = e.target.value;
    if (
      name === this.props.data.user.name &&
      this.state.email === this.props.data.user.emailAddress &&
      this.state.emailSubscription === this.props.data.user.emailSubscription
    ) {
      this.setState({ saveEnabled: false, name: name });
    } else {
      this.setState({ saveEnabled: true, name: name });
    }
  }

  emailChange(e) {
    const email = e.target.value;
    if (
      this.state.name === this.props.data.user.name &&
      email === this.props.data.user.emailAddress &&
      this.state.emailSubscription === this.props.data.user.emailSubscription
    ) {
      this.setState({ saveEnabled: false, email: email });
    } else {
      this.setState({ saveEnabled: true, email: email });
    }
  }

  subscriptionChange(data) {
    const emailSubscription = data.checked;
    if (
      this.state.name === this.props.data.user.name &&
      this.state.email === this.props.data.user.emailAddress &&
      emailSubscription === this.props.data.user.emailSubscription
    ) {
      this.setState({
        saveEnabled: false,
        emailSubscription: emailSubscription
      });
    } else {
      this.setState({
        saveEnabled: true,
        emailSubscription: emailSubscription
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="alignCenter">
          <h4>Edit & save your profile</h4>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="First Name"
                value={this.state.name}
                onChange={e => this.nameChange(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Last Name"
                value={this.state.email}
                onChange={e => this.emailChange(e)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="I agree to the Email Subscription"
                checked={this.state.emailSubscription}
                onChange={(e, data) => this.subscriptionChange(data)}
              />
            </Form.Field>
            <Button
              type="submit"
              disabled={!this.state.saveEnabled}
              onClick={this._onSubmit.bind(this)}
            >
              Save
            </Button>
          </Form>
        </div>
        <Footer />
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

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      emailAddress
      emailSubscription
    }
  }
`;
export default graphql(updateUser, { name: 'updateUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(Profile)
);
