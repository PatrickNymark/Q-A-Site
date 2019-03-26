import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { logoutUser } from '../../actions/authActions';
import { getProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

// Semantic UI
import {
  Container,
  Image,
  Grid,
  Menu,
  Label,
  Button,
  Segment,
  Loader
} from 'semantic-ui-react';

// Components
import Profile from './profile/Profile';
import MyQuestions from './my-questions/MyQuestions';

class Dashboard extends Component {
  state = {
    activeItem: 'profile'
  };

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    });
  };

  componentWillMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { errors } = this.props;
    const { activeItem } = this.state;

    if (loading) {
      return <Loader active />
    }

    if (errors.notfound) {
      return <Button>Add Profile</Button>;
    }

    return (
      <div>
        <Container style={{ marginTop: '80px' }}>
          <Menu pointing secondary>
            <Menu.Item
              name="profile"
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
            >
              Profile
              </Menu.Item>
            <Menu.Item
              name="myQuestions"
              active={activeItem === 'myQuestions'}
              onClick={this.handleItemClick}
            >
              My Questions
              </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item
                style={{ margin: '0.6px' }}
                name="logout"
                onClick={this.props.logoutUser}
              >
                Logout
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu>
              <Menu.Item
                name="inbox"
                active={activeItem === 'inbox'}
                onClick={this.handleItemClick}
              >
                Inbox
                  <Label size="small" style={{ marginBottom: '0' }} color="red">
                  1
                  </Label>
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          {this.state.activeItem === 'profile' ? <Profile /> : null}
          {this.state.activeItem === 'myQuestions' ? (
            <MyQuestions user={this.props.auth.user} />
          ) : null}
        </Container>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, getProfile, clearErrors }
)(Dashboard);
