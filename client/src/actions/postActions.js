import {
  TEST_DISPATCH,
  ADD_POST,
  GET_POST_ERRORS,
  GET_POST_USER,
  DELETE_POST
} from './types';
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
      history.push('/questions');
    })
    .catch(err =>
      dispatch({ type: GET_POST_ERRORS, payload: err.response.message })
    );
};

export const getPostByUser = user => dispatch => {
  axios
    .get('/api/posts/user', user)
    .then(res => dispatch({ type: GET_POST_USER, payload: res.data }))
    .catch(err => console.log(err));
};

export const deletePost = postID => dispatch => {
  axios
    .delete(`/api/posts/${postID}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: postID
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POST_ERRORS,
        payload: err.response.message
      })
    );
};
