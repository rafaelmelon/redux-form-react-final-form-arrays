import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { dataReducer } from './data';

export const rootReducer = combineReducers({
  form: formReducer,
  data: dataReducer,
});
