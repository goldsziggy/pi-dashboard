/*
* @Author: Matthew Zygowicz
* @Date:   2016-08-13 10:05:01
* @Last Modified by:   Matthew Zygowicz
*/

import React from 'react'
import Calendar from '../Calendar/calendar';
import Time from '../Time/time';

//load config
import config from '../../../config/config';

//load css
import '../../styles/index.scss'
import '../../styles/foundation.scss'

// load jquery and foundation in the window scope

import 'script!jquery'
import 'script!foundation-sites'
import 'script!moment';
import 'script!fullcalendar'

export default class CalendarPage extends React.Component {

  render(){
    return (
      <div className='full-page'>
        <Time refreshRate={config.timer.secondly} />
        <Calendar refreshRate={config.timer.tenMinutes} src={config.calendar.src}/>
      </div> 
    )
  }

  componentDidMount() {
    $(document).foundation()
  }
}

export default CalendarPage