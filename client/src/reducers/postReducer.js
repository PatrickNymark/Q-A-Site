import { TEST_DISPATCH, GET_POST, GET_POST_ERRORS } from '../actions/types';

const initialState = {
  post: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        isWorking: true
      };

    case GET_POST:
      return {
        ...state
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
