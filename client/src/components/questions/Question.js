import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Card, Icon, Label, Feed, Container, Input, TextArea, Form, Divider, Loader, Header } from 'semantic-ui-react';
import Comments from './comments/Comments';

class Question extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      comments: [],
      isLiked: false,
      showComments: false
    }
  }

  componentDidMount() {
    this.setState({
      comments: this.props.post.comments
    });

    const likeIndex = this.props.post.likes
      .map(like => like._id)
      .indexOf(this.props.auth.user.id);

    if (likeIndex > -1) {
      this.setState({
        isLiked: true
      })
    }
  }

  handleComments = e => {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  handleCommentClick = e => {
    document.getElementById('inputField').focus();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLike = e => {
    axios.post(`/api/posts/like/${this.props.post._id}`).then(res => {
      this.setState({
        isLiked: !this.state.isLiked
      })
    }).catch(err => console.log(err))
  }

  onSubmit = e => {
    e.preventDefault();

    const comment = {
      text: this.state.comment,
      userName: this.props.auth.user.name
    }

    axios.post(`/api/posts/comment/${this.props.post._id}`, comment).then(res => {
      this.setState({
        comments: res.data.comments,
        comment: '',
        showComments: true
      })
    }).catch(err => this.setState({ error: err.response.data }))
  }

  render() {
    const { post } = this.props;
    const { showComments } = this.state;
    const { comments } = this.state;
    return (
      <Card style={{ width: '90%' }}>
        <Card.Content style={{ margin: '20px 0px' }}>
          <Header as={Link} to={`/question/${post._id}`} >{post.title}</Header>
        </Card.Content>
        <Card.Content description={post.text} />
        <Card.Content style={{ fontSize: '12px', padding: '0px 40px' }} extra>
          <Feed.Like style={{ float: 'left' }}><Icon size="small" name='like' color="red" />{post.likes.length} Likes</Feed.Like>
          <Feed.Like style={{ float: 'right' }} onClick={this.handleComments}><Icon size="small" name='comment' color="blue" />{comments.length} Comments</Feed.Like>
        </Card.Content>
        <Card.Content extra>
          <Feed.Like color="red" onClick={this.handleLike} style={{ marginRight: '30px' }}> <Icon name='like' color={this.state.isLiked ? 'red' : null} />Like</Feed.Like>
          <Feed.Like style={{ marginLeft: '30px' }} onClick={this.handleCommentClick}><Icon name="comment" />Comment</Feed.Like>

        </Card.Content>
        <Card.Content extra>
          <Form onSubmit={this.onSubmit}>
            {this.state.error && <Label basic color="red" pointing="below">{this.state.error.text || this.state.error}</Label>}
            <Input id="inputField" name="comment" onChange={this.onChange} value={this.state.comment} fluid placeholder="Your comment ..." />
          </Form>

        </Card.Content>
        {showComments && <Comments comments={comments} />}
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Question);

