/*
* @Author: ziggy
* @Date:   2016-08-03 17:37:47
* @Last Modified by:   ziggy
*/

'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App/app'
import configureStore from './store/configureStore';

let store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
); 
 