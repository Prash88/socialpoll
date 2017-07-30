// @flow
import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { graphql, gql } from 'react-apollo';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

type Props = {
  user: Object,
  data: Object
};

class Home extends Component {
  props: Props;

  render() {
    if (this.props.data.loading) {
      return (
        <div>
          <Header />
          <div className="alignCenter">
            <Segment>
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            </Segment>
          </div>
          <Footer />
        </div>
      );
    } else {
      const questions = [];
      this.props.data.allQuestions.forEach(function(question) {
        questions.push(
          <li key={question.id}>
            {question.text}
          </li>
        );
      });
      return (
        <div>
          <Header />
          <div className="alignCenter">
            {questions}
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const allQuestions = gql`
  query {
    allQuestions {
      id
      text
    }
  }
`;

export default graphql(allQuestions, {
  options: { fetchPolicy: 'network-only' }
})(Home);
