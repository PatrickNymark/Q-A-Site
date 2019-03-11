import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ''
    };
  }
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

    axios
      .post('/api/auth/login', payload)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="Email"
            onChange={this.onChange}
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
