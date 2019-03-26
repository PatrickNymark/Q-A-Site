import {
  TEST_DISPATCH,
  GET_POST,
  GET_POST_ERRORS,
  GET_POST_USER,
  DELETE_POST
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  errors: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POST_USER:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POST_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
