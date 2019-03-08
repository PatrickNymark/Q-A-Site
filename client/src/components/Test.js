import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testDispatch } from '../actions/postActions';

class Test extends Component {
  render() {
    return (
      <div>
        <h1>Test Route</h1>
        <button onClick={this.props.testDispatch}>Click to dispatch</button>
      </div>
    );
  }
}

export default connect(
  null,
  { testDispatch }
)(Test);
