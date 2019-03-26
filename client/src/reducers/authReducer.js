import { LOGIN_USER_SUCCESS, LOGIN_USER_PENDING, GET_ERRORS } from '../actions/types';
import isEmpty from '../helpers/isEmpty';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
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

    case GET_ERRORS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}


