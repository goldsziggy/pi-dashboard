/*
* @Author: ziggy
* @Date:   2016-08-04 18:58:25
* @Last Modified by:   ziggy
*/

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

//here I can add middleware if needed
export default function configureStore(initialState={}) {
  const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunk)

    ))
  return store;
}