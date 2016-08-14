/*
* @Author: ziggy
* @Date:   2016-08-09 05:07:24
* @Last Modified by:   Matthew Zygowicz
*/

'use strict';


import config from '../../../config/config';

export const REQUEST_IMAGES = 'facebookImages.REQUEST_IMAGES';
export const SUCCESS_IMAGES = 'facebookImages.SUCCESS_IMAGES';
export const FAILURE_IMAGES = 'facebookImages.FAILURE_IMAGES';



export function onRequestImages(){
  return (dispatch) => {
    dispatch(requestImages());

    return fetch('//localhost:3000/facebook')
      .then((response)=>{
        if (!response.ok) {
            dispatch(failureImages('Bad response from server'));
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
      })
      .then((data)=> {
        if(data.error)
          return dispatch(failureImages(data.payload.error));
        return dispatch(successImages({photos: data.payload.photos}));

      })
      .catch((error)=>{
        dispatch(failureImages(error));
      })
  }
}

function requestImages() {
  return {
    type: REQUEST_IMAGES
  }
}

function successImages(payload) {
  return {
    type: SUCCESS_IMAGES,
    payload
  }
}

function failureImages(payload) {
  return {
    type: FAILURE_IMAGES,
    payload
  }
}