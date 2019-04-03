import React from 'react'
import { Link } from 'react-router-dom';

import { Item, Button, Label, Icon } from 'semantic-ui-react';

const Question = (props) => {
  const { post } = props;
  return (
    <Item>
      <Item.Content>
        <Item.Header as='a'>{post.title}</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description>{post.text}</Item.Description>
        <Item.Extra>
          <Label as={Link} to={`/questions/${post._id}`} color="red">
            Go to question
          </Label>
          <Label as="a"><Icon name="like" />{post.likes.length}</Label>
          <Label as="a"><Icon name="comment" />{post.comments.length}</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default Question;