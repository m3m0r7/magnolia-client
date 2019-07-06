import {combineReducers, ReducersMapObject} from 'redux'
import { connectRouter } from 'connected-react-router'

import { LoginReducer } from './LoginReducer';
import { SettingReducer } from './SettingReducer';

export default (history: any) => combineReducers<any, any>({
  router: connectRouter(history),
  login: LoginReducer,
  setting: SettingReducer,
})
