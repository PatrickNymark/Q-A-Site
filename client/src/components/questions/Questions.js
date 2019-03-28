import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/postActions';
import { Loader, Card, Icon, Grid, Label, Segment, Header, Container } from 'semantic-ui-react';
import Question from './Question';


class Questions extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }


  render() {
    const { post } = this.props;

    if (post.loading) {
      return <Loader active />
    }
    return (
      <Container textAlign="center">
        <Header style={{ fontFamily: 'Montserrat', fontSize: '40px' }}>Questions</Header>
        <Grid textAlign="center">
          <Grid.Column textAlign="center" width={12}>
            {post.posts.map(post => {
              return <Question key={post._id} post={post} />
            })}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getAllPosts })(Questions);
