/*
* @Author: ziggy
* @Date:   2016-08-11 20:02:35
* @Last Modified by:   Matthew Zygowicz
*/

import Forecast from 'forecastio';
import appConfig from '../../config/config';


let forecastOptions = {
  APIKey: appConfig.weather.forecast_io
}

// var forecast = new Forecast(forecastOptions);
let forecast = new Forecast(appConfig.weather.forecast_io);

/**
 * This service calls the Forecast.io weather service to obtain weather data.
 */
export default function weatherService(req, resp){
  forecast.forecast(appConfig.weather.latitude, appConfig.weather.longitude)
    .then(function(data) {
      return resp.send({error: false, payload: {weather: data}});
    })
    .catch(function(error){
      return resp.send({error: true, payload: {error}})
    })
  // forecast.get(appConfig.weather.latitude, appConfig.weather.longitude, (error, res, data) => {
  //   if (error) {
  //     return resp.send({error: true, payload: {error}})
  //   }
  //   return resp.send({error: false, payload: {weather: data}});
  // });
}


