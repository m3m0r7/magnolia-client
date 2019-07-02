import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { LoginReducer } from './LoginReducer';
import { SettingReducer } from './SettingReducer';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  login: LoginReducer,
  setting: SettingReducer,
})
