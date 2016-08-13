/*
* @Author: ziggy
* @Date:   2016-08-03 17:37:47
* @Last Modified by:   Matthew Zygowicz
*/

'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './components/App/app'
import PhotoPage from './components/Photopage/photoPage';
import CalendarPage from './components/CalendarPage/calendarPage';
import configureStore from './store/configureStore';

let store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
      <Route path='/photos' component={PhotoPage} />
      <Route path='/calendar' component={CalendarPage} />
    </Router> 
  </Provider>,
  document.getElementById('app')
); 
 