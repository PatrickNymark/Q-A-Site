import React, { Component } from 'react'

import { Loader, Feed, Icon, Divider } from 'semantic-ui-react';
import Comment from './Comment';

const Comments = props => {
  const { comments } = props
  return (
    <Feed>
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />
      })}
      <Divider />
    </Feed>
  )
}

export default Comments;