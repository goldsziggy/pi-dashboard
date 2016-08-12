/*
* @Author: ziggy
* @Date:   2016-08-04 18:39:38
* @Last Modified by:   ziggy
*/

'use strict';
import {combineReducers} from 'redux';
import * as actions from './quoteActions';

const initialState = {
  quote: '',
  error: ''
}

function state (state = initialState, action){
  const payload = action.payload;
  switch(action.type){
    case actions.SUCCESS_QUOTE: 
      return Object.assign({}, state, {quote: payload.quote});
    case actions.FAILURE_QUOTE:
      return Object.assign({}, state, {error: payload.error})
    default: 
      return state;
  }
}


const quote = combineReducers({state})
export default quote;