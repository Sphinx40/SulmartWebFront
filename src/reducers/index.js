import { combineReducers } from 'redux';

import MainReducer from './MainReducer';
import AddressReducer from './addressReducer';

export default combineReducers({
  Main: MainReducer,
  address: AddressReducer
});
