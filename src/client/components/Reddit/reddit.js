/*
* @Author: ziggy
* @Date:   2016-08-04 18:15:09
* @Last Modified by:   ziggy
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 

import * as RedditActions from './redditActions';

export default class Reddit extends React.Component {
  render(){
    // const now = new Date();
    const {reddits} = this.props;

    return (
      <div className='collapse row'>
        <div className='columns medium-12'>
          <div id='reddit-embed'></div>
          <table className='reddit-table'>
          <thead><tr><th>{this.props.search_term}</th></tr></thead>
          <tbody id='reddit-body'>
          {
            reddits.map((obj, key) => {
              return <tr key={key}><td>{obj.data.title}</td></tr>
            })
          }
          </tbody>
          </table>
        </div>
      </div>
    );
  }

  //refresh daily.
  startPolling() {
    let self = this;
    const resfreshRate = this.props.refreshRate ? this.props.refreshRate : 21750000;
    setTimeout(()=>{
      self.poll();
      self._timer = setInterval(self.poll.bind(self), 21750000);
    }, 21750000)
  }

  poll() {
    this.setState();
  }
  componentDidMount(){
    //register the scroller
    setInterval(this.autoScroller.bind(this),50)
    this.props.actions.onRequestReddit(this.props.search_term);
    this.startPolling();
  }

  componentWillUnmount(){
    if(this._timer) {
        clearInterval(this._timer);
        this._timer = null;
    }
  }

  autoScroller() {
    if(document.getElementById('reddit-body').scrollTop<(document.getElementById('reddit-body').scrollHeight-document.getElementById('reddit-body').offsetHeight)){-1
         document.getElementById('reddit-body').scrollTop=document.getElementById('reddit-body').scrollTop+1
         }
    else {document.getElementById('reddit-body').scrollTop=0;}
  }
}


const mapStateToProps = (state) => ({
  reddits: state.reddit.state.reddits,
  error: state.reddit.state.error
})
const mapDispatchToProps = (dispatch) =>({
  actions: bindActionCreators(RedditActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Reddit);
export {Reddit as TReddit};