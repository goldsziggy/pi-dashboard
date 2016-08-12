/*
* @Author: ziggy
* @Date:   2016-08-04 18:15:09
* @Last Modified by:   ziggy
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuoteActions from './quoteActions';

//@todo build an Action and a Reducer to handle the state!
export default class Quote extends React.Component {
  render(){
    // const now = new Date();
    const {quote, error} = this.props;

    return (
      <div className='row'>

        <div className='row collapse'>
          <div className='columns medium-12'>
            <blockquote className='quote' id='quote'><span className='bold'>"</span>{quote.quote}<span className='bold'>"</span><cite className='author' id='author'>{quote.author}</cite></blockquote>
          </div>
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
    let self = this;
    const resfreshRate = this.props.refreshRate ? this.props.refreshRate : 87000000;
    setTimeout(()=>{
      // if(!self.isMounted()) return;
      self.poll();
      self._timer = setInterval(self.poll.bind(self), resfreshRate);
    }, resfreshRate)
  }

  poll() {
    // this.setState();
    this.props.actions.onRequestQuote();
  }
  componentDidMount(){
    this.props.actions.onRequestQuote();
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
  quote: state.quote.state.quote,
  error: state.quote.state.error
})
const mapDispatchToProps = (dispatch) =>({
  actions: bindActionCreators(QuoteActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Quote);
export {Quote as TQuote};