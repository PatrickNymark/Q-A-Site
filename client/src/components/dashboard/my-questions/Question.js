import React from 'react'

import { Item, Button, Label, Icon } from 'semantic-ui-react';

const Question = (props) => {
  const { post } = props;
  return (
    <Item>
      <Item.Content>
        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description>{post.title}</Item.Description>
        <Item.Extra>
          <Button color="red" floated='right'>
            Go to question
             <Icon name='right chevron' />
          </Button>
          <Label>102 Likes</Label>
          <Label>26 Comments</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default Question;