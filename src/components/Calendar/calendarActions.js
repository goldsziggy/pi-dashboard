/*
* @Author: ziggy
* @Date:   2016-08-06 05:56:54
* @Last Modified by:   ziggy
*/
// import GoogleStrategy from 'passport-google-oauth'
// var GoogleStrategy = requigoogleper
// import ical from 'ical';s
import config from '../../config/config';
import fetch from 'isomorphic-fetch';

export const REQUEST_GOOGLE_EVENTS = 'calendar.REQUEST_GOOGLE_EVENTS';
export const FAILURE_GOOGLE_EVENTS = 'calendar.FAILURE_GOOGLE_EVENTS';
export const SUCCESS_GOOGLE_EVENTS = 'calendar.SUCCESS_GOOGLE_EVENTS';

export function onRequestGoogleEvents(){
  return (dispatch) => {
      fetch('//localhost:3000/ical')
        .then((response) => {
          if (!response.ok) {
            // dispatch(failedQuote('Bad response from server'));
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
          return response.json();
        })
        .then((data)=> {
          dispatch(successGoogleEvents({events: data}));
        })
        .catch((error)=>{
          dispatch(failureGoogleEvents(error));
        })
  }
}

function requestGoogleEvents(){
  return {
    type: REQUEST_GOOGLE_EVENTS
  }
}

function successGoogleEvents(payload){
  return {
    type: SUCCESS_GOOGLE_EVENTS,
    payload
  }
}

function failureGoogleEvents(error) {
  return {
    type: FAILURE_GOOGLE_EVENTS,
    payload: {
      error
    }
  }
}