/*
* @Author: ziggy
* @Date:   2016-08-03 20:01:59
* @Last Modified by:   ziggy
*/

import fetch from 'isomorphic-fetch';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import moment from 'moment';
import ical from 'ical';
import express from 'express';

import appConfig from './src/config/config';

//import services
import icalService from './server/routes/ical';
import redditService from './server/routes/reddit';
import weatherService from './server/routes/weather';
import facebookService from './server/routes/facebook';

let app = new express()
const port = process.env.WEBPACK_PORT || 3000

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*********************************************************/
// Establish custom services.  These are used by components
// to obtain necessary data from the outside world.
/*********************************************************/
app.get('/ical', icalService);
app.post('/reddit', redditService);
app.get('/weather', weatherService)
app.get('/facebook', facebookService);


app.use(function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})