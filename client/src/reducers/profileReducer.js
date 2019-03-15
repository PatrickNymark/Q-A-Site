import {
  GET_PROFILE,
  GET_PROFILE_ERRORS,
  GET_PROFILE_LOADING
} from '../actions/types';

const initialState = {
  profile: {},
  errors: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };

    case GET_PROFILE_ERRORS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    case GET_PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
