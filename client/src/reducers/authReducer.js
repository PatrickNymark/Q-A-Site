import { TEST_DISPATCH, REGISTER_USER, GET_ERRORS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        isWorking: true
      };

    case GET_ERRORS: {
      return {
        ...state,
        errors: action.payload
      };
    }
    default:
      return state;
  }
}
