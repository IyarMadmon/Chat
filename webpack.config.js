var webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'static'),
  entry: "./js/main.js",
  module: {
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015', 'stage-0'],
         plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
       }
     }
   ]
 },
 output: {
   path: path.join(__dirname, 'static'),
   filename: "scripts.min.js"
 },
};
