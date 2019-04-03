import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostsByUser, deletePost } from '../../../actions/postActions';

// Semantic UI
import {
  Segment,
  Container,
  Divider,
  Header,
  Loader,
  Item,
  Grid
} from 'semantic-ui-react';
import Question from './Question';

class MyQuestions extends Component {
  componentDidMount() {
    this.props.getPostsByUser(this.props.auth.user.id);
  }

  render() {
    const { post } = this.props;
    const { user } = this.props.auth;

    if (post.loading) {
      return <Loader active />
    }

    if (post.posts.length === 0) {
      return <h1>No posts</h1>
    }

    return (
      <div>
        <Container>
          <Segment stacked style={{ minHeight: '600px', padding: '30px' }}>
            <Header
              textAlign="center"
              as="h1"
              style={{
                color: '#363855',
                fontFamily: 'Montserrat',
                letterSpacing: '7px'
              }}
            >
              MY QUESTIONS
             </Header>
            <Divider />

            <Grid>
              <Grid.Column textAlign="left">
                <Item.Group divided>
                  {post.posts.map(post => {
                    return (
                      <Question key={post._id} post={post} />
                    )
                  })}
                </Item.Group>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPostsByUser, deletePost }
)(MyQuestions);
