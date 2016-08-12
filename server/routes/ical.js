// /*
// * @Author: ziggy
// * @Date:   2016-08-07 11:59:24
// * @Last Modified by:   ziggy
// */
// 
// 

import {RRule} from 'rrule';
import moment from 'moment';
import ical from 'ical';
import appConfig from '../../src/config/config';

let events = [];
moment.locale('us');

/**
 * This function uses the ical url in the config to obtain a users iCAL.
 * Once the iCal is found, the function will then parse it for events.
 * Once completed it starts the holiday iCal.  While parsing the iCal it
 * attempts to find recurring events adding each to the event array
 */
function get_personal_ical(resp) {
  ical.fromURL(appConfig.calendar.gmailPrivateIcal, {}, function(err, data) {

      for (var k in data){
        if (data.hasOwnProperty(k)) {
          var ev = data[k];
          
          var event = {};

          if(ev.rrule){
            delete ev.rrule.options.bynmonthday;
            delete ev.rrule.options.bynweekday;
            var rule = new RRule(ev.rrule.options);
            var sub_events = rule.all();
            var i = 0; 
            for(var e in sub_events){
              var myEv = sub_events[e];
              event = {};
              event.desc = ev.description;
              event.title = ev.summary;  
              event.start = moment(myEv).toDate();
              event.end = moment(myEv).toDate();
              events.push(event);
              if(moment(myEv).isAfter('2018-12-12'))
                break;
            }  
          } else {
            event.start = moment(ev.start).toDate();
            event.end = moment(ev.end).toDate();
            event.desc = ev.description;
            event.title = ev.summary;  
            events.push(event);  
          }
        }
      }
      get_holiday_ical(resp);
    });
}

/**
 * This function obtains an iCal based on the config file.  It parses it for basic event information 
 * and appends it to the events array.
 */
function get_holiday_ical(resp) {
  ical.fromURL(appConfig.calendar.holidayIcal, {}, function(err, data){
      for (var k in data){
        if (data.hasOwnProperty(k)) {
          var ev = data[k];
          var event = {};
          event.start = moment(ev.start).toDate();
          event.end = moment(ev.end).toDate();
          event.desc = ev.description;
          event.title = ev.summary;
          events.push(event);
        }
      }
      resp.send(events);
  });
}

/**
 * This service retrives iCals from Google Services.  It relys on the private
 * iCal URL found inside of Google.
 */
export default function icalService(req, resp){
  events = []; //reset events
  get_personal_ical(resp);
}
