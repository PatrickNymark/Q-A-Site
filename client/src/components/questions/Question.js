import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, getComments, clearComments } from '../../actions/commentsActions'
import Moment from 'react-moment';

import { Card, Icon, Label, Feed, Container, Input, TextArea, Form, Divider, Loader } from 'semantic-ui-react';

class Question extends Component {
  state = {
    showComments: false,
    comment: '',
  }

  handleComments = e => {
    this.setState({
      showComments: !this.state.showComments
    })

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const comment = {
      text: this.state.comment,
      userName: this.props.auth.user.name
    }

    this.props.addComment(comment, this.props.post._id);
    this.setState({
      comment: ''
    })
  }

  componentDidMount() {
    this.props.getComments(this.props.post._id);
  }


  render() {
    const { post } = this.props;
    const { showComments } = this.state;
    return (
      <Card style={{ width: '90%' }}>
        <Card.Content style={{ margin: '20px 0px' }} header={post.title} />
        <Card.Content description={post.text} />
        <Card.Content extra>
          <Feed.Like style={{ marginRight: '20px' }}> <Icon name='like' />{post.likes.length} Likes</Feed.Like>
          <Feed.Like onClick={this.handleComments}><Icon name="comment" />{post.comments.length} Comments</Feed.Like>

        </Card.Content>
        <Card.Content extra>
          <Form onSubmit={this.onSubmit}>
            {this.props.errors.text && <Label basic color="red" pointing="below">{this.props.errors.text}</Label>}

            <Input name="comment" onChange={this.onChange} value={this.state.comment} fluid placeholder="Your comment ..." />


          </Form>
        </Card.Content>
        {showComments &&
          <Feed>

            <Loader inline="centered" active={this.props.comments.loading} />
            {this.props.comments.comments.map(comment => {
              return <Feed.Event style={{ padding: '20px 20px' }}>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User style={{ marginRight: '5px', }}>{comment.userName}</Feed.User>
                    {comment.text} <br />
                  </Feed.Summary>

                  <Feed.Meta>
                    <Feed.Like style={{ fontSize: '15px' }}>
                      <Moment format="DD/MM/YYYY hh:mm">
                        {comment.date}
                      </Moment>
                    </Feed.Like>
                  </Feed.Meta>
                  <Divider />

                </Feed.Content>
                {comment.user === this.props.auth.user.id && <Icon name="remove circle" color="blue" corner="left" />}

              </Feed.Event>
            })}
            <Divider />
          </Feed>}
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  comments: state.comments
})

export default connect(mapStateToProps, { addComment, getComments, clearComments })(Question);

