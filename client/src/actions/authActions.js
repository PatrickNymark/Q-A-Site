import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Constants
import { GET_ERRORS, LOGIN_USER } from './types';
import setAuthToken from '../helpers/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      console.log(res.data);
      const { token } = res.data;
      // Save to localstorage
      localStorage.setItem('jwtToken', token);
      // Set axois auth header
      setAuthToken(token);
      // Set current user
      const decoded = jwt_decode(token);
      dispatch({ type: LOGIN_USER, payload: decoded });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
