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
              <h4>
                Question : {question.text}
              </h4>
              {question.allOptions.map(option => {
                return (
                  <h4 key={option.id}>
                    {option.text}
                  </h4>
                );
              })}
            </Segment>
          </div>
        );
      });
      return (
        <div>
          <Header />
          <div>
            {questions}
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
