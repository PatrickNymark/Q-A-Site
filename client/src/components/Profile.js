import React, { Component } from 'react';

// Semantic UI
import { Segment } from 'semantic-ui-react';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Segment style={{ minHeight: '600px' }} stacked>
          <h4>Profile</h4>
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
