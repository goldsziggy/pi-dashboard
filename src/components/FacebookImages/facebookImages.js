/*
* @Author: ziggy
* @Date:   2016-08-09 05:07:13
* @Last Modified by:   ziggy
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FacebookActions from './facebookImagesActions';
import Slider from 'react-slick'

//@todo build an Action and a Reducer to handle the state!
export default class FacebookImages extends React.Component {
  render(){
    const {photos, error} = this.props;
    var settings = {
      dots: false,
      infinite: true,
      speed: 50,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div className='row'>
        <div className='facebook-slider'>
        {photos && photos.length > 0 ? 
          <Slider {...settings}>
          {
            photos.map((element, key) => {
              return (<div key={key + element.id}><img src={element.source}/></div>)
            })
          }
          </Slider>
          : null
        }
          
        </div>
        
        { error && error.length > 0 ?
          <div className='row collapse'>
          <div className='columns medium-12'>
            <div className='alert-box alert' id='error'>{error}</div>
          </div>
        </div> : null
        }
        
      </div>
    );
  }

  //refresh daily.
  startPolling() {
    // let self = this;
    // const resfreshRate = this.props.refreshRate ? this.props.refreshRate : 87000000;
    // setTimeout(()=>{
    //   // if(!self.isMounted()) return;
    //   self.poll();
    //   self._timer = setInterval(self.poll.bind(self), resfreshRate);
    // }, resfreshRate)
  }

  poll() {
    
  }
  componentDidMount(){
    this.props.actions.onRequestImages();
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
  photos: state.facebookImages.state.photos,
  error: state.facebookImages.state.error
})
const mapDispatchToProps = (dispatch) =>({
  actions: bindActionCreators(FacebookActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(FacebookImages);
export {FacebookImages as TFacebookImages};