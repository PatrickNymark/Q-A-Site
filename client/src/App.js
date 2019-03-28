import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './App.css';

// Redux Store
import store from './store';

// Constants
import { LOGIN_USER_SUCCESS } from './actions/types';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Reset from './components/auth/Reset';
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import setAuthToken from './helpers/setAuthToken';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Questions from './components/questions/Questions';

// Check localStorage for token
if (localStorage.jwtToken) {
  // Set default axios header
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user authentication
  store.dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: decoded
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Switch>
              <Route exact path="/forgot" component={Reset} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
