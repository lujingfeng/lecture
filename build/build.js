var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.config.js');
var compiler = webpack(webpackConfig);
compiler.run(()=>{
  console.log('successed!!!');
});