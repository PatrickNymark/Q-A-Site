import { GET_PROFILE, GET_PROFILE_ERRORS, GET_PROFILE_LOADING } from './types';
import axios from 'axios';

export const getProfile = () => dispatch => {
  dispatch({
    type: GET_PROFILE_LOADING
  });
  axios
    .get('/api/profiles/')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE_ERRORS,
        payload: err
      });
    });
};
