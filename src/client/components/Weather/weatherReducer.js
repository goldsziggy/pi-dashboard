/*
* @Author: ziggy
* @Date:   2016-08-09 19:58:59
* @Last Modified by:   ziggy
*/

'use strict';
import {combineReducers} from 'redux';
import * as actions from './weatherActions';

const initialState = {
  weather: {},
  error: ''
}

function state (state = initialState, action){
  const payload = action.payload;
  switch(action.type){
    case actions.SUCCESS_WEATHER: 
      return Object.assign({}, state, {weather: payload.weather});
    case actions.FAILURE_WEATHER:
      return Object.assign({}, state, {error: payload.error})
    default: 
      return state;
  }
}


const weather = combineReducers({state})
export default weather;