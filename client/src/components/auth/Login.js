import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';

// Actions
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

// Semantic UI
import {
  Container,
  Grid,
  Form,
  Button,
  Label,
  Segment,
  Divider,
  Header,
  Icon,
  Loader,
} from 'semantic-ui-react';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

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

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    const { loading } = this.props.auth;
    const { errors } = this.props;
    return (
      <Container>
        {loading && <Loader active />
        }

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
                {errors.email && (
                  <Label basic color="red" pointing="below">
                    {errors.email}
                  </Label>
                )}
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  name="email"
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email"
                  error={isEmpty(errors.email) ? false : true}
                />

                <Divider />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                  error={isEmpty(errors.password) ? false : true}
                />
                {errors.password && (
                  <Label
                    style={{ margin: '-5px' }}
                    basic
                    color="red"
                    pointing="above"
                  >
                    {errors.password}
                  </Label>
                )}
                <Divider />

                <Button
                  color="red"
                  fluid
                  type="submit"
                >
                  Login
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
