import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { getProfile } from '../actions/profileActions';

// Semantic UI
import {
  Container,
  Image,
  Grid,
  Menu,
  Label,
  Button,
  Segment
} from 'semantic-ui-react';
import Profile from '../components/dashboard/profile/Profile';
import MyQuestions from '../components/dashboard/my-questions/MyQuestions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'profile'
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    });
  };

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { profile, isLoading, errors } = this.props.profile;
    const { activeItem } = this.state;

    if (Object.keys(errors).length > 0) {
      return <Button>Add Profile</Button>;
    }

    if (Object.keys(profile).length === 0 || isLoading) {
      return <div>loading...</div>;
    } else {
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
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, getProfile }
)(Dashboard);
