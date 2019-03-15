import { TEST_DISPATCH, ADD_POST, GET_POST_ERRORS } from './types';
import axios from 'axios';

export const testDispatch = () => dispatch => {
  dispatch({
    type: TEST_DISPATCH,
    payload: true
  });
};

export const addQuestion = (postInfo, history) => dispatch => {
  axios
    .post('/api/posts/', postInfo)
    .then(res => {
      history.push('/questions/');
    })
    .catch(err => {
      dispatch({
        type: GET_POST_ERRORS,
        payload: err.response.data
      });
    });
};
