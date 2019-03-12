import React, { Component } from 'react';
import axios from 'axios';

export default class Forgot extends Component {
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const payload = {
      email: this.state.email
    };

    axios
      .post('/api/auth/forgot', payload)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            onChange={this.onChange}
            type="text"
            placeholder="Email"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
