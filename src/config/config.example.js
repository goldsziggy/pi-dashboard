/*
* @Author: ziggy
* @Date:   2016-08-06 06:10:32
* @Last Modified by:   Matthew Zygowicz
*/

'use strict';
const config = {
  calendar: {
    gmailPrivateIcal: '', //your private personal ical URL
    holidayIcal: 'https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics', // googles public ical for holidays
    src: '' // if you plan on using an IFRAME go down this route.
  },
  quote: {
    src: '//quotes.rest/qod.json' //Public URL of a daily Quote API
  },
  weather: {
    src: '', //used if you want to embed an IFrame for the weather
    forecast_io: '', //your forecast_io APIKey.  Used if you are using Forecastio
    latitude: '', // your latitude - used if your using the custom forecast_io component (non-embed)
    longitude: ''// your longitude - used if your using the custom forecast_io component (non-embed)
  },
  reddit: {
    sub_reddit: 'news' // What subreddit you want to subscribe to.
  },
  timer: { // the timer section is used internally for refresh rates
    daily: 87000000,
    hourly: 3600000, 
    secondly: 1000,
    fourTimesADay: 21750000,
    tenMinutes: 600000,
    minute: 60000,
  },
  facebook: {
    api: '',//facebook UserAccessToken (may not be used anymore)
    userId: '',// facebook user-id (may not be used anymore)
    customServiceURL: 'http://localhost:1337/photos' //used by the service, what port is node-facebook-photo-scraper listening on
  }

}

export default config;