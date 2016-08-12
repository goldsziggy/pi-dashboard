/*
* @Author: ziggy
* @Date:   2016-08-09 19:58:53
* @Last Modified by:   ziggy
*/

import fetch from 'isomorphic-fetch';
import config from '../../config/config';
// import Forcast from 'forecast.io';

// const options = {
//   APIKey: config.weather.forecast_io
// }
// const forecast = new Forecast(options);

export const REQUEST_WEATHER = 'weather.REQUEST_WEATHER';
export const SUCCESS_WEATHER = 'weather.SUCCESS_WEATHER';
export const FAILURE_WEATHER = 'weather.FAILURE_WEATHER';

export function onRequestWeather(){
  return (dispatch) => {
    console.log('startRequest Weather');
    dispatch(request_weather());
    return fetch('//localhost:3000/weather')
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
        console.log('weather data');
        console.log(data);
        if(data.error)
          return dispatch(failure_weather(data.payload.error));
        return dispatch(success_weather({weather: data.payload.weather}));

      })
      .catch((error)=>{
        console.log('weather error');
        console.log(error);
        dispatch(failure_weather(error));
      })
    // forcast.get(config.weather.latitude, config.weather.longitude, (err, res, data) => {
    //   if (err) {
    //     return dispatch(failure_weather(err));
    //   }
    //   console.log(res);
    //   console.log(data);
    // });

  }
}

function request_weather(){
  return {
    type: REQUEST_WEATHER
  }
}

function success_weather(weather){
  return {
    type: SUCCESS_WEATHER,
    payload: weather
  }
}

function failure_weather(error){
  return {
    type: FAILURE_WEATHER,
    payload: {error}
  }
}