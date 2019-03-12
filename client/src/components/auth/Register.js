import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

// Semantic UI
import { Container, Grid, Form, Button } from 'semantic-ui-react';

class Register extends Component {
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(payload, this.props.history);
  };
  render() {
    return (
      <Container>
        <Grid style={{ marginTop: '100px' }} textAlign="center">
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Input
                name="firstName"
                onChange={this.onChange}
                type="text"
                placeholder="First Name"
              />
              <Form.Input
                name="lastName"
                onChange={this.onChange}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="email"
                onChange={this.onChange}
                type="text"
                placeholder="Email"
              />
              <Form.Input
                name="password"
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button fluid type="submit">
              Register
            </Button>
          </Form>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
