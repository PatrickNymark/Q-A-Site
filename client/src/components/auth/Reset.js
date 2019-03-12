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
      newPassword: this.state.newPassword
    };

    axios
      .post(`/api/auth/reset/${this.props.match.params.token}`, payload)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="newPassword"
            onChange={this.onChange}
            type="text"
            placeholder="New password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
