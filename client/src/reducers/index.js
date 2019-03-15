import { combineReducers } from 'redux';

import postReducer from './postReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  post: postReducer,
  auth: authReducer,
  profile: profileReducer
});
