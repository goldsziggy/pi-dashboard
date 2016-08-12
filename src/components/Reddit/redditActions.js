/*
* @Author: ziggy
* @Date:   2016-08-05 12:11:45
* @Last Modified by:   ziggy
*/

'use strict';
import fetch from 'isomorphic-fetch';
export const REQUEST_REDDIT = 'reddit.REQUEST_REDDIT';
export const FAILURE_REDDIT = 'reddit.FAILURE_REDDIT';
export const SUCCESS_REDDIT = 'reddit.SUCCESS_REDDIT';



export function onRequestReddit(term){
  return (dispatch) => {
    dispatch(request_reddit);
    fetch('//localhost:3000/reddit', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({search_term: term})
    })
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
          if(data.error)
            return dispatch(failure_reddit(data.payload.error));
          return dispatch(success_reddit({reddits: data.payload.children}));
        })
        .catch((error)=>{
          console.log(error);
          dispatch(failure_reddit(error));
        })
  }
}

function request_reddit(){
  return {
    type: REQUEST_REDDIT
  }
};

function failure_reddit(error){
  return {
    type: FAILURE_REDDIT,
    payload: {error}
  }
};

function success_reddit(data){
  return {
    type: SUCCESS_REDDIT,
    payload: {reddits: data}
  }
};