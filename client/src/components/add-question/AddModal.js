import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

import { Modal, Form, Input, TextArea, Button } from 'semantic-ui-react';

class AddModal extends Component {
  state = {
    showModal: false,
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

    const payload = {
      creator: this.props.auth.user,
      title: this.state.title,
      text: this.state.text
    };

    this.props.addPost(payload, this.props.history);
    this.handleModal();
  };

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button color="red" onClick={this.handleModal}>
              ADD QUESTION
            </Button>
          }
          closeOnDimmerClick={true}
          closeIcon
          onClose={this.handleModal}
          open={this.state.showModal}
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
                  style={{ margin: '20px 0px' }}
                />
                <Input fluid onChange={this.onChange} name="category" placeholder="Enter category" />
                <Input style={{  margin: '20px 0px' }} fluid onChange={this.onChange} name="tags" placeholder="Enter tags to describe question, seperate with comma" />

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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(AddModal);
