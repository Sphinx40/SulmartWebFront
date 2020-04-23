import { combineReducers } from 'redux';

import MainReducer from './MainReducer';
import ZmapReducer from './ZmapReducer';

export default combineReducers ({
  Main: MainReducer,
  Zmap: ZmapReducer
});