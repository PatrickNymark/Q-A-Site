import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_USER_POSTS_SUCCESS,
  GET_POSTS_LOADING
} from './types';
import axios from 'axios';


export const addPost = (postInfo, history) => dispatch => {
  dispatch({
    type: GET_POSTS_LOADING
  })
  axios
    .post('/api/posts/', postInfo)
    .then(res => {
      history.push('/questions');
    })
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    );
};

export const getPostsByUser = user => dispatch => {
  dispatch({
    type: GET_POSTS_LOADING
  })
  axios
    .get('/api/posts/user', user)
    .then(res => dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deletePost = postID => dispatch => {
  dispatch({
    type: GET_POSTS_LOADING
  })
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
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
