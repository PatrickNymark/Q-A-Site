import { combineReducers } from 'redux';

import postReducer from './postReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  post: postReducer,
  comments: commentsReducer,
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer
});
