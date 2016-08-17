/*
* @Author: ziggy
* @Date:   2016-08-04 17:16:26
* @Last Modified by:   Matthew Zygowicz
*/

import React from 'react';
import dateFormat from 'dateformat';

export default class Time extends React.Component {
  render(){
    const time_format = this.props.timeFormat ? this.props.timeFormat : 'h:MM TT';
    const time = dateFormat(time_format);
    const date = dateFormat('dddd mmmm dS, yyyy')
    return (
     <div className='collapse row'>
        <div className='row'>
          <div className='columns medium-4 medium-offset-4'>
            <div id="time" className='time center'>{time}</div>
          </div>
        </div>
        <div className='row'>
          <div className='columns medium-4 medium-offset-4'>
            <div id="date" className='date'>{date}</div>
          </div>
        </div>
      </div>
    );
  }

  startPolling() {
    let self = this;
    let resfreshRate = this.props.refreshRate ? this.props.refreshRate : 1000;
    
    setTimeout(()=>{
      // if(!self.isMounted()) return;
      self.poll();
      self._timer = setInterval(self.poll.bind(self), resfreshRate);
    }, resfreshRate)
  }

  poll() {
    this.setState({});
  }
  componentDidMount(){
    this.startPolling();
  }

  componentWillUnmount(){
    if(this._timer) {
        clearInterval(this._timer);
        this._timer = null;
    }
  }
}