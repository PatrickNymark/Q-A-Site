import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
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

    axios
      .post('/api/auth/register', payload)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="firstName"
            onChange={this.onChange}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            onChange={this.onChange}
            type="text"
            placeholder="Last Name"
          />
          <input
            name="email"
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
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
