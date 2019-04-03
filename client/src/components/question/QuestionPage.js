import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getSinglePost } from '../../actions/postActions';

import Question from '../questions/Question';
import { Container, Segment } from 'semantic-ui-react';

class QuestionPage extends Component {

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id);
  }

  render() {
    const { post } = this.props.post;
    return (
      <Container>
        <Segment stacked>
          <h1>{post.title}</h1>

        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getSinglePost })(QuestionPage);