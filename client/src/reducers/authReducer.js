import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGIN_USER_PENDING } from '../actions/types';
import isEmpty from '../helpers/isEmpty';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  errors: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      }

    default:
      return state;
  }
}


