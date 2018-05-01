import { combineReducers } from 'redux'; 

import commentReducer from './commentReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import { reducer as reduxForm}  from 'redux-form';
export default combineReducers({
  comment: commentReducer,
  post: postReducer,
  category: categoryReducer,
  form: reduxForm
});
