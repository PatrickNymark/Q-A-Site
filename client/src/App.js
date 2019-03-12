import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';

// Redux Store
import store from './store';

// Components
import Test from './components/Test';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';

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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
