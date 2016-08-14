/*
* @Author: ziggy
* @Date:   2016-08-03 17:37:07
* @Last Modified by:   Matthew Zygowicz
*/

var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var APP_DIR = path.join(__dirname, '../../src');
console.log(APP_DIR);

var assetPath = '/assets/'
var absolutePath = path.join(__dirname, 'dist', assetPath)

//some webpack learnings from:
//https://github.com/timaschew/react-redux-foundation-boilerplate/blob/master/webpack.config.js
module.exports = {
    devtool: 'source-map',
    entry: ['webpack-hot-middleware/client',path.join(__dirname, '../client/entry.js')],
    output: {
        path: absolutePath,
        filename: "bundle.js",
        publicPath: assetPath
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("bundle.css")
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test : /\.js?/,
              include : APP_DIR,
              loader : 'babel'
            },
            // fonts and svg
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            {
              // images
              test: /\.(ico|jpe?g|png|gif)$/,
              loader: "file"
            },
            { test: /\.json$/, loader: 'json-loader' },
            {
              // for some modules like foundation
              test: /\.scss$/,
              exclude: [/node_modules/], // sassLoader will include node_modules explicitly
              loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded")
            },
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss")
            }
        ]
    },
    postcss: function(webpack) {
      return [
        autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
      ]
    },
    sassLoader: {
      includePaths: [path.resolve(__dirname, "node_modules")]
    },
    node: {
      fs: "empty",
      xml2js: 'empty'
    }
};