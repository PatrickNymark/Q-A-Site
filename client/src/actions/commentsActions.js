import { ADD_COMMENT, GET_COMMENTS_SUCCESS, GET_ERRORS, GET_COMMENTS_LOADING, DELETE_COMMENT } from './types';
import axios from 'axios'


export const addComment = (comment, postID) => dispatch => {
  axios
    .post(`/api/posts/comment/${postID}`, comment)
    .then(res => dispatch({ type: ADD_COMMENT, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const getComments = (postID) => dispatch => {
  dispatch({
    type: GET_COMMENTS_LOADING
  });

  axios.get(`/api/posts/comment/${postID}`).then(res => {
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const removeComment = (commentID, postID) => dispatch => {
  dispatch({
    type: GET_COMMENTS_LOADING
  })

  axios.delete(`/api/posts/comment/${postID}/${commentID}`).then(res => dispatch({ type: DELETE_COMMENT, payload: res.data })).catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

export const clearComments = () => dispatch => {
  dispatch({
    type: GET_COMMENTS_SUCCESS,
    payload: {}
  })
}
