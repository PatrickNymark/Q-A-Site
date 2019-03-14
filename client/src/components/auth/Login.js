import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { loginUser } from '../../actions/authActions';

// Semantic UI
import { Container, Grid, Form, Button } from 'semantic-ui-react';

class Login extends Component {
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const payload = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(payload);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <Container>
        <Grid style={{ marginTop: '100px' }} textAlign="center">
          <Form style={{ minWidth: '450px' }} onSubmit={this.onSubmit}>
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
            <Button fluid type="submit">
              Login
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
  { loginUser }
)(Login);
