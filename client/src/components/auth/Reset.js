import React, { Component } from 'react';
import axios from 'axios';

import { Grid, Form, Button, Segment, Header, Icon, Label } from 'semantic-ui-react'

export default class Forgot extends Component {
  state = {
    error: {},
    msg: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const payload = {
      email: this.state.email
    };

    axios
      .post('/api/auth/reset', payload)
      .then(res => {
        this.setState({ error: {}, msg: res.data, loading: false })
      })
      .catch(err => this.setState({ error: err.response.data, msg: '' }));
  };
  render() {
    return (
      <Grid verticalAlign="middle" textAlign="center" style={{ minHeight: '90vh' }}>
        <Grid.Column width={4}>
          <Form onSubmit={this.onSubmit}>
            <Segment stacked>
              <div>
                <Header as="h2" icon>
                  <Icon color="red" name="users" />
                  <Header.Content>
                    Quora Replica
                <Header.Subheader style={{ marginTop: '5px' }}>
                      Question & answer site
                </Header.Subheader>
                  </Header.Content>
                </Header>
              </div>
              <p>Enter your user email, and we will send you a link to reset your password</p>
              {this.state.error.notfound && (
                <Label basic color="red" pointing="below">
                  {this.state.error.notfound}
                </Label>
              )}

              {this.state.msg.msg && <Label style={{ margin: '20px', fontSize: '14px' }} basic color="green" >
                {this.state.msg.msg}
              </Label>}
              <Form.Input
                name="email"
                onChange={this.onChange}
                type="text"
                placeholder="Please enter email"
              />

              <Button color="red" fluid type="submit">Send</Button>
            </Segment>
          </Form>

        </Grid.Column>

      </Grid>
    );
  }
}
