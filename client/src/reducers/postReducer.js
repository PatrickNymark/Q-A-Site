import {
  GET_POST_SUCCESS,
  GET_POSTS_LOADING,
  DELETE_POST,
  GET_USER_POSTS_SUCCESS
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
