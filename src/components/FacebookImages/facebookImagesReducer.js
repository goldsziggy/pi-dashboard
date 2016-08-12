/*
* @Author: ziggy
* @Date:   2016-08-09 05:07:34
* @Last Modified by:   ziggy
*/

'use strict';
import {combineReducers} from 'redux';
import * as actions from './facebookImagesActions';

const initialState = {
  photos: [],
  error: ''
}

function state (state = initialState, action){
  const payload = action.payload;
  switch(action.type){
    case actions.SUCCESS_IMAGES: 
      return Object.assign({}, state, {photos: payload.photos});
    case actions.FAILURE_IMAGES:
      return Object.assign({}, state, {error: payload.error})
    default: 
      return state;
  }
}


const facebook = combineReducers({state})
export default facebook;