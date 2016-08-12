/*
* @Author: ziggy
* @Date:   2016-08-04 18:35:20
* @Last Modified by:   ziggy
*/

import fetch from 'isomorphic-fetch'
import config from '../../config/config';

export const REQUEST_QUOTE = 'quote.REQUEST_QUOTE';
export const SUCCESS_QUOTE = 'quote.SUCCESS_QUOTE';
export const FAILURE_QUOTE = 'quote.FAILURE_QUOTE';

export function onRequestQuote(){
  return (dispatch) => {
    dispatch(requestQuote());

    return fetch(config.quote.src)
      .then((response)=>{
        if (!response.ok) {
            // dispatch(failedQuote('Bad response from server'));
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
      })
      .then((data)=> {
        if(data.error)
          dispatch(failedQuote(data.error.message));
        if(data.success)
          dispatch(successQuote({quote: data.contents.quotes[0]}));

      })
      .catch((error)=>{
        console.log('catch');
        console.log(error);
        dispatch(failedQuote(error));
      })
  }
}

function requestQuote() {
  return {
    type: REQUEST_QUOTE
  }
}

function failedQuote(error) {
  return {
    type: FAILURE_QUOTE,
    payload: {
      error
    }
  }
}

function successQuote(payload){
  return {
    type: SUCCESS_QUOTE,
    payload
  }
}