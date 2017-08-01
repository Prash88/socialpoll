// @flow
import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { graphql, gql } from 'react-apollo';
import { Dimmer, Loader, Segment, Radio, Form } from 'semantic-ui-react';

type Props = {
  user: Object,
  data: Object
};

type State = {
  value: string
};

class Home extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    if (this.props.data.loading) {
      return (
        <div>
          <Header />
          <div className="alignCenter">
            <Dimmer active inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          </div>
          <Footer />
        </div>
      );
    } else {
      const questions = this.props.data.allQuestions.map(question => {
        return (
          <div key={question.id} style={styles.questionSegment}>
            <Segment>
              <Form.Field>
                <h4>
                  Question : {question.text}
                </h4>
              </Form.Field>
              {question.allOptions.map(option => {
                return (
                  <Form.Field key={option.id}>
                    <Radio
                      label={option.text}
                      name="radioGroup"
                      value={option.id}
                      checked={this.state.value === option.id}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                );
              })}
            </Segment>
          </div>
        );
      });
      return (
        <div>
          <Header />
          <div style={styles.headerView} className="alignCenterHorizontal">
            <h2>Polls Available</h2>
          </div>
          <div>
            <Form>
              {questions}
            </Form>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const styles = {
  questionSegment: {
    paddingTop: 40
  },
  headerView: {
    paddingTop: 40
  }
};

const allQuestions = gql`
  query {
    allQuestions {
      id
      text
      allOptions {
        id
        text
      }
    }
  }
`;

export default graphql(allQuestions, {
  options: { fetchPolicy: 'network-only' }
})(Home);
