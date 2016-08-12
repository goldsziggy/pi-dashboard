/*
* @Author: ziggy
* @Date:   2016-08-03 20:07:29
* @Last Modified by:   ziggy
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Skycons from 'react-skycons';
import changeCase from 'change-case';
import * as WeatherActions from './weatherActions';


export default class Weather extends React.Component {

  getCurrentWeather(){
    const {weather} = this.props;
    const skyconIcon = changeCase.constantCase(weather.currently.icon);
    const skyconStyle = {
      width: '82px',
      height: '82px',
      display: 'inline-block'
    }
    return (
      <section className='currently weather-section row'>
        <h6>Right Now</h6>
        <div className='row'>
          <div className='columns medium-9'>
            <Skycons color='black' icon={skyconIcon} style={skyconStyle} width={164} height={164}/>
            <div className='weather-temp'>{weather.currently.temperature}°</div>
          </div>
        </div>
        <div className='weather-summary'>{weather.currently.summary} • Feels like {weather.currently.apparentTemperature}</div>
      </section>
    )
  }

  weatherTextContainer(weather, weatherClass, title){
    return (
      <section className={weatherClass + ' weather-section row'}>
        <h6>{title}</h6>
        <i className={weather.icon}/>
        <div className='weather-summary'>{weather.summary}</div>
      </section>
    )
  }

  render(){
    const {src, weather, error} = this.props;
    return (
      <div className='collapse row'>
        <div className='columns medium-12'>
          {
            src && src.length > 0 ?
              <iframe id='forcast-embed' src={src} className='weather' frameBorder="0" scrolling="no"></iframe>
            : null
          }
          { error && error.length > 0 ?
            <div className='row collapse'>
              <div className='columns medium-12'>
                <div className='alert-box alert' id='error'>{error}</div>
              </div>
            </div> : null
          }
          {
            weather && weather.daily ? 
              <div id='weather-widget' className='weather-widget'>
                {this.getCurrentWeather()}
                {this.weatherTextContainer(weather.minutely, 'minutely', 'NEXT HOUR')}
                {this.weatherTextContainer(weather.hourly, 'hourly', 'NEXT 24 HOURS')}
                {this.weatherTextContainer(weather.daily, 'daily', 'NEXT 7 DAYS')}
              </div>
            : null
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
    this.props.actions.onRequestWeather();

    this.setState({});
  }
  componentDidMount(){
    setInterval(this.autoScroller.bind(this),50) //register auto-scroller
    this.props.actions.onRequestWeather();
    this.startPolling();    
  }

  componentWillUnmount(){
    if(this._timer) {
        clearInterval(this._timer);
        this._timer = null;
    }
  }

  autoScroller() {
    //if we have the weather, perform the scrolling
    if(this.props.weather && this.props.weather.daily){
      if(document.getElementById('weather-widget').scrollTop<(document.getElementById('weather-widget').scrollHeight-document.getElementById('weather-widget').offsetHeight)){-1
         document.getElementById('weather-widget').scrollTop=document.getElementById('weather-widget').scrollTop+1
         }
      else {document.getElementById('weather-widget').scrollTop=0;}  
    }
    
  }
}

const mapStateToProps = (state) => ({
  weather: state.weather.state.weather,
  error: state.weather.state.error
})
const mapDispatchToProps = (dispatch) =>({
  actions: bindActionCreators(WeatherActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Weather);
export {Weather as TWeather};