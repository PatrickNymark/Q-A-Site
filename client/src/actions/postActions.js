import { TEST_DISPATCH } from './types';

export const testDispatch = () => dispatch => {
  dispatch({
    type: TEST_DISPATCH,
    payload: true
  });
};
