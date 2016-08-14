/*
* @Author: Matthew Zygowicz
* @Date:   2016-08-13 09:57:10
* @Last Modified by:   Matthew Zygowicz
*/

import React from 'react'
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

export default class PhotoPage extends React.Component {

  render(){
    return (
      <div className='full-page'>
        <FacebookImages slidesToShow={1} />
      </div> 
    )
  }

  componentDidMount() {
    $(document).foundation()
  }
}

export default PhotoPage
