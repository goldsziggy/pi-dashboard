/*
* @Author: ziggy
* @Date:   2016-08-11 20:12:04
* @Last Modified by:   Matthew Zygowicz
*/

import fetch from 'isomorphic-fetch';
import appConfig from '../../config/config';

/**
 * This service utilizes the service I built node-facebook-photo-scraper
 * This servie retrieves an array of photo objects, with source to be
 * displayed by the Facebook component
 * https://github.com/goldsziggy/node-facebook-photo-scraper
 */
export default function facebookService(req, res){
  fetch(appConfig.facebook.customServiceURL)
      .then((response)=>{
        if (!response.ok) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
      })
      .then((photos)=> {
        return res.send({
          error: false,
          payload: {photos}
        })
      })
      .catch((error)=>{
        return res.send({
          error: true,
          payload: {error}
        })
      })
}