var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);
var webpackDevServer = require('webpack-dev-server');

var path = require('path');

var server = new webpackDevServer(compiler, {
  contentBase: path.join(__dirname, '..', 'dev'),
  compress: true,
  stats: true
});

server.listen(9003);