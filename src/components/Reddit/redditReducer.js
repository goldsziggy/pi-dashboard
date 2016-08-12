/*
* @Author: ziggy
* @Date:   2016-08-05 12:15:45
* @Last Modified by:   ziggy
*/

'use strict';
import {combineReducers} from 'redux';
import * as actions from './redditActions';

const initialState = {
  reddits: [],
  error: ''
}

function state (state = initialState, action){
  const payload = action.payload;
  switch(action.type){
    case actions.SUCCESS_REDDIT: 
      return Object.assign({}, state, {reddits: payload.reddits.reddits});
    case actions.FAILURE_REDDIT:
      return Object.assign({}, state, {error: payload.error})
    default: 
      return state;
  }
}


const reddit = combineReducers({state})
export default reddit;