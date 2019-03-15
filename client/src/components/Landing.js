import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
