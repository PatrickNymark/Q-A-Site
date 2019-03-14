import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './App.css';

// Redux Store
import store from './store';

// Constants
import { LOGIN_USER } from './actions/types';

// Components
import Test from './components/Test';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './templates/Dashboard';
import setAuthToken from './helpers/setAuthToken';

// Check localStorage for token
if (localStorage.jwtToken) {
  // Set default axios header
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user authentication
  store.dispatch({
    type: LOGIN_USER,
    payload: decoded
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <h1>React-Redux Boilerplate</h1>
            <ul style={{ display: 'inline-block' }}>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
            <Route exact path="/test" component={Test} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/auth/:token" component={Reset} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
