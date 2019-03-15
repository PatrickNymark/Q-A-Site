import React, { Component } from 'react';

// Semantic UI
import { Segment } from 'semantic-ui-react';

export default class MyQuestions extends Component {
  render() {
    return (
      <div>
        <Segment attached="bottom">
          <h4>My Questions</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            sequi architecto eaque molestias unde officiis recusandae quae
            officia a fugiat!
          </p>
        </Segment>
      </div>
    );
  }
}
