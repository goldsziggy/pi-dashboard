/*
* @Author: ziggy
* @Date:   2016-08-03 18:56:22
* @Last Modified by:   ziggy
*/

import React from 'react'

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.displayName = 'HeaderComponent';
    }
    render() {
        return (
            <header className="top-bar" id='header-container'>
              <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                  <li className="menu-text">Dashboard</li>
                  <li><a href="#">Calendar</a></li>
                  <li><a href="#">Weather</a></li>
                </ul>
              </div>
            </header>
        );
    }
}