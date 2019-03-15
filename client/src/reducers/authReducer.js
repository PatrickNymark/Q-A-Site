import { LOGIN_USER, GET_AUTH_ERRORS, GET_USER } from '../actions/types';
import isEmpty from '../helpers/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case GET_AUTH_ERRORS: {
      return {
        ...state,
        errors: action.payload
      };
    }

    default:
      return state;
  }
}
