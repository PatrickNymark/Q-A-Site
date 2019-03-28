import { ADD_COMMENT, GET_COMMENTS_SUCCESS, GET_COMMENTS_LOADING } from '../actions/types';

const initialState = {
  comments: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      }

    default:
      return state;
  }
}