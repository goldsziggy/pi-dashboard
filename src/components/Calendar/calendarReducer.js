/*
* @Author: ziggy
* @Date:   2016-08-06 06:39:52
* @Last Modified by:   ziggy
*/

import {combineReducers} from 'redux';
import * as actions from './calendarActions';

const initialState = {
  events: [],
  error: ''
}

function state (state = initialState, action){
  const payload = action.payload;
  switch(action.type){
    case actions.SUCCESS_GOOGLE_EVENTS: 
      return Object.assign({}, state, {events: payload.events});
    case actions.FAILURE_GOOGLE_EVENTS:
      return Object.assign({}, state, {error: payload.error});
    default: 
      return state;
  }
}


const quote = combineReducers({state})
export default quote;