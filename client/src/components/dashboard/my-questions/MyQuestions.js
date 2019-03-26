import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getPostByUser, deletePost } from '../../../actions/postActions';
import axios from 'axios';

// Semantic UI
import {
  Segment,
  Feed,
  List,
  Icon,
  Button,
  Label,
  Container,
  Card,
  Image,
  Grid,
  Item,
  Divider,
  Header
} from 'semantic-ui-react';

class MyQuestions extends Component {
  componentDidMount() {
    this.props.getPostByUser(this.props.auth.user);
  }

  render() {
    const { posts } = this.props.post;
    const { user } = this.props.auth;

    if (posts.length === 0) {
      return <div>You have not created any questions yet! </div>;
    }

    return (
      <div>
        <Container>
          <Segment style={{ minHeight: '600px', padding: '30px' }}>
            <Grid>
              <Grid.Column width={16}>
                <Item style={{ margin: '20px 3px' }}>
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
                </Item>
              </Grid.Column>
            </Grid>

            <Grid>
              {posts.map(post => {
                return (
                  <Grid.Column textAlign="left" width={16}>
                    <Grid>
                      <Grid.Column width={8}>
                        <Item>
                          <Item.Content style={{ fontFamily: 'Montserrat' }}>
                            <Item.Header
                              style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                letterSpacing: '2.6px',
                                margin: '20px 0px'
                              }}
                            >
                              {post.title}
                            </Item.Header>
                            <Item.Description>
                              <p>{post.text}</p>
                            </Item.Description>
                            <Item.Description>
                              Number of likes: {post.likes.length}
                            </Item.Description>
                            <Item.Description>
                              Number of comments: {post.comments.length}
                            </Item.Description>
                            <Item.Description>
                              <Button.Group
                                style={{ margin: '40px 0px' }}
                                widths={2}
                              >
                                <Button basic color="grey">
                                  Edit
                                </Button>
                                <Button
                                  onClick={() =>
                                    this.props.deletePost(post._id)
                                  }
                                  color="red"
                                >
                                  Delete
                                </Button>
                              </Button.Group>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      </Grid.Column>

                      <Grid.Column width={8} floated="right" textAlign="right">
                        <Item>
                          <Item.Description>
                            <Moment
                              style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                letterSpacing: '3px'
                              }}
                              format="DD/MM/YYYY hh:mm"
                            >
                              {post.date}
                            </Moment>
                          </Item.Description>
                        </Item>
                      </Grid.Column>
                    </Grid>

                    <Divider />
                  </Grid.Column>
                );
              })}
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
  { getPostByUser, deletePost }
)(MyQuestions);
