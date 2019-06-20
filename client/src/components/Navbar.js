import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

import { Container, Menu, Button, Icon, Popup } from 'semantic-ui-react';

import AddModal from './add-question/AddModal';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'home'
    };
  }
  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    });
  };

  render() {
    const { activeItem } = this.state;

    const notAuthenticatedLinks = (
      <React.Fragment>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              color="red"
              active={activeItem === 'login'}
              name="login"
              onClick={this.handleItemClick}
              as={Link}
              to="/login"
            >
              Login
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </React.Fragment>
    );

    const authenticatedLinks = (
      <React.Fragment>
        <Menu.Menu position="right">
          <Menu.Item
            active={activeItem === 'dashboard'}
            name="dashboard"
            as={Link}
            to="/dashboard"
            onClick={this.handleItemClick}
          >
            <Popup
              on="click"
              content={<Button onClick={this.props.logoutUser}>Logout</Button>}
              trigger={
                <Icon
                  style={{ margin: '0px' }}
                  color="red"
                  size="big"
                  name="user circle"
                />
              }
            />
          </Menu.Item>

          <Menu.Item>
            <AddModal />
          </Menu.Item>
        </Menu.Menu>
      </React.Fragment>
    );

    return (
      <Menu>
        <Container>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/questions"
            name="questions"
            active={activeItem === 'questions'}
            onClick={this.handleItemClick}
          >
            Questions
          </Menu.Item>
          {this.props.auth.isAuthenticated
            ? authenticatedLinks
            : notAuthenticatedLinks}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
