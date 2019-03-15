import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../actions/postActions';

import { Menu, Button, Modal, Input, TextArea, Form } from 'semantic-ui-react';

class AddQuestion extends Component {
  state = {
    title: '',
    text: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('clicked');

    const payload = {
      creator: this.props.auth.user,
      title: this.state.title,
      text: this.state.text
    };

    this.props.addQuestion(payload);
  };

  render() {
    const { activeItem, handleItemClick } = this.props;
    return (
      <Modal
        closeIcon
        closeOnDimmerClick={true}
        trigger={
          <Menu.Item>
            <Button
              color="red"
              active={activeItem === 'addQuestion'}
              name="addQuestion"
              onClick={handleItemClick}
            >
              ADD QUESTION
            </Button>
          </Menu.Item>
        }
      >
        <Modal.Header>ADD QUESTION</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.onSubmit}>
              <Input
                onChange={this.onChange}
                name="title"
                fluid
                type="text"
                placeholder="Start your question with What, How, Why, etc."
              />
              <TextArea
                onChange={this.onChange}
                name="text"
                rows={10}
                placeholder="Describe your question more in depth, or provide links etc."
                style={{ width: '100%', marginTop: '20px' }}
              />
              <Button
                type="submit"
                style={{ margin: '10px' }}
                floated="right"
                color="red"
              >
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addQuestion }
)(AddQuestion);
