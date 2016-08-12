/*
* @Author: ziggy
* @Date:   2016-08-03 17:54:22
* @Last Modified by:   ziggy
*/

import { combineReducers } from 'redux'
import quote from '../components/Quote/quoteReducer';
import weather from '../components/Weather/weatherReducer';
import reddit from '../components/Reddit/redditReducer';
import calendar from '../components/Calendar/calendarReducer';
import facebookImages from '../components/FacebookImages/facebookImagesReducer';
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

const myCalApp = combineReducers({
  quote,
  reddit,
  calendar,
  weather,
  facebookImages
})

export default myCalApp