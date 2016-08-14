/*
* @Author: ziggy
* @Date:   2016-08-03 20:07:29
* @Last Modified by:   Matthew Zygowicz
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import * as CalendarActions from './calendarActions';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
export default class Calendar extends React.Component {
  render(){
    const {src, events} = this.props;
    const currentDate = new Date();
    return (
      <div className='collapse row'>
        <div className='columns medium-12'>
        { src && src.length > 0 ?
          <iframe src={src} className='calendar' id='calendar' frameBorder="0" scrolling="no"></iframe>
          : 
          <div className='calendar'>
            <BigCalendar
              selectable
              events={events}
              defaultDate={currentDate}
              toolbar={false}
            />
          </div>
        }

        </div>
      </div>
    );
  }
  startPolling() {
    let self = this;
    const resfreshRate = this.props.refreshRate ? this.props.refreshRate : 3600000;
    
    setTimeout(()=>{
      // if(!self.isMounted()) return;
      self.poll();
      self._timer = setInterval(self.poll.bind(self), resfreshRate);
    }, resfreshRate)
  }

  poll() {
    if(!this.props.src || this.props.src.length === 0)
      this.props.actions.onRequestGoogleEvents();
    else 
      setState();
  }
  componentDidMount(){
    this.props.actions.onRequestGoogleEvents();
    this.startPolling();
  }

  componentWillUnmount(){
    if(this._timer) {
        clearInterval(this._timer);
        this._timer = null;
    }
  }
}

const mapStateToProps = (state) => ({
  events: state.calendar.state.events,
  error: state.calendar.state.error
})
const mapDispatchToProps = (dispatch) =>({
  actions: bindActionCreators(CalendarActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
export {Calendar as TCalendar};