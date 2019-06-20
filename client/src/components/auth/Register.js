import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


// Semantic UI
import {
  Container,
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Icon,
  Label,
  Divider
} from 'semantic-ui-react';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {}
  };

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

    console.log(payload)

    this.props.registerUser(payload, this.props.history);
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <Container>
        <Grid
          style={{ height: '90vh' }}
          verticalAlign="middle"
          textAlign="center"
        >
          <Grid.Column style={{ maxWidth: '450px' }}>
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

                <Form.Group widths="equal">
                  <Form.Input
                    onChange={this.onChange}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                  <Form.Input
                    onChange={this.onChange}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    onChange={this.onChange}
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <Form.Input
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Divider />

                <Button color="red" fluid type="submit">
                  Register
                </Button>
              </Segment>
              <Segment>
                <Grid style={{ width: '100%', fontSize: '13px' }}>
                  <Grid.Column width={7}>
                    New to us? <Link to="/register">Click here</Link>
                  </Grid.Column>
                  <Grid.Column width={9}>
                    Forgot password? <Link to="/forgot">Click here</Link>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Form>
          </Grid.Column>
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
  { registerUser, clearErrors }
)(Register);
