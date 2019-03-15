import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Menu, Button, Icon } from 'semantic-ui-react';
import AddQuestion from './AddQuestion';

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

    if (this.props.auth.isAuthenticated) {
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
            <Menu.Menu position="right">
              <Menu.Item
                active={activeItem === 'dashboard'}
                name="dashboard"
                as={Link}
                to="/dashboard"
                onClick={this.handleItemClick}
              >
                <Icon style={{ margin: '0px' }} size="big" name="user circle" />
              </Menu.Item>

              <AddQuestion
                activeItem={activeItem}
                handleItemClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Container>
        </Menu>
      );
    } else {
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
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  active={activeItem === 'addQuestion'}
                  name="addQuestion"
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/questions/add"
                >
                  Login
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
