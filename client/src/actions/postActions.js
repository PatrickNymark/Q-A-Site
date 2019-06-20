import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_USER_POSTS_SUCCESS,
  GET_POSTS_LOADING,
  GET_POSTS_SUCCESS,
  GET_POST_SUCCESS
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

export const getPostsByUser = userID => dispatch => {
  dispatch({
    type: GET_POSTS_LOADING
  })
  axios
    .get(`/api/posts/user/${userID}`)
    .then(res => dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getAllPosts = () => dispatch => {
  dispatch({
    type: GET_POSTS_LOADING
  })

  axios
    .get('/api/posts/')
    .then(res => {
      dispatch({ type: GET_POSTS_SUCCESS, payload: res.data })
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }))
}

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

export const getSinglePost = postID => dispatch => {
  dispatch({
    type: GET_POSTS_LOADING
  })

  axios.get(`/api/posts/${postID}`).then(res => {
    dispatch({
      type: GET_POST_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}
