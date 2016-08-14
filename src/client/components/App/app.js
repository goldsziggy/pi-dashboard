/*
* @Author: ziggy
* @Date:   2016-08-03 17:50:19
* @Last Modified by:   Matthew Zygowicz
*/
import React from 'react'
import Header from '../Header/header';
import Calendar from '../Calendar/calendar';
import Weather from '../Weather/weather';
import Time from '../Time/time';
import Quote from '../Quote/quote';
import Reddit from '../Reddit/reddit';
import FacebookImages from '../FacebookImages/facebookImages';

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
// <Header />
//     <Calendar />
//     <Weather />
//     <Footer />
//     
export default class App extends React.Component {

  render(){
    return (
      <div>
        {/*<Header />*/}
        <Time refreshRate={config.timer.secondly} />
        <Calendar refreshRate={config.timer.tenMinutes} src={config.calendar.src}/>
        
        <FacebookImages />
        <div className='row'>
          <div className='columns medium-4'>
            <Reddit refreshRate={config.timer.fourTimesADay} search_term={'news'}/>
          </div>
          <div className='columns medium-4'>
            {/*<Quote refreshRate={config.timer.daily}/>*/}
          </div>
          <div className='columns medium-4'>
            <Weather refreshRate={config.timer.hourly}/>
          </div>
        </div>
      </div> 
    )
  }

  componentDidMount() {
    $(document).foundation()
  }
}

export default App