import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Feed, Divider, Icon } from 'semantic-ui-react';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <Feed.Event key={comment._id} style={{ padding: '5px 20px' }}>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User style={{ marginRight: '5px', marginBottom: '5px', fontSize: '16px' }}>{comment.userName}</Feed.User>
            <p style={{ display: 'inline', opacity: '0.8' }}>{comment.text}</p>
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
        {comment.user === this.props.auth.user.id && <Icon id={comment._id} onClick={this.onDeleteClick} name="remove circle" color="blue" corner="top left" />}

      </Feed.Event>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Comment);
