import { GET_ERRORS, GET_PROFILE_LOADING, GET_PROFILE_SUCCESS } from './types';
import axios from 'axios';

export const getProfile = () => dispatch => {
  dispatch({
    type: GET_PROFILE_LOADING
  });
  axios
    .get('/api/profiles/')
    .then(res => {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
