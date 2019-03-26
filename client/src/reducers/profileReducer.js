import {
  GET_PROFILE_SUCCESS,
  GET_ERRORS,
  GET_PROFILE_LOADING
} from '../actions/types';

const initialState = {
  profile: {},
  errors: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_ERRORS:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
