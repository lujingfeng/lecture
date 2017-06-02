var path = require("path");
var webpack = require("webpack");
var cssnext = require('postcss-cssnext')
var postcssFlexFallback = require('postcss-flex-fallback')
var postcssPx2rem = require('postcss-px2rem')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env) {
  env = env || 'dev';
  var isDev = env === 'dev';
  var plugins = [];
  var devtool = 'eval';

  if (!isDev) {
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));

    plugins.push(new ExtractTextPlugin({
      filename: 'style.[contenthash:8].css',
      disable: false,
      allChunks: true
    }));

    plugins.push(
      new HtmlWebpackPlugin({
        files: {
          css: 'style.[contenthash:8].css',
          js: 'main.[chunkhash:8].js'
        },
        filename: './index.html',
        template: './dev/tpl.html',
        inject: false
      })
    );

    // plugins.push(
    //   new SWPrecacheWebpackPlugin(
    //     {
    //       cacheId: "eo-mobile",
    //       filename: "/sw.js",
    //       staticFileGlobs: [
    //         'style.**.css',
    //         'main.**.js',
    //       ],
    //       stripPrefix: '/', // stripPrefixMulti is also supported 
    //       mergeStaticsConfig: true, // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config 
    //       staticFileGlobsIgnorePatterns: [/\.(map|png|jpg)$/], // use this to ignore sourcemap files 
    //     }
    //   )
    // );
    devtool = 'source-map';
  }else{
    plugins.push(
      new ExtractTextPlugin({
        filename: 'style.css',
        disable: false,
        allChunks: true
      })
    );
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  var resolve = {
    modules: [path.join(__dirname, 'app'), 'node_modules'],
    extensions: ['.js', '.scss']
  };

  if(!isDev){
    resolve.mainFields = ['jsnext:main', 'main'];
  }

  var conf = {
    entry: {
      main: ['./app/main.js']
    },

    output: {
      path: isDev ? "/dev" : "dist",
      publicPath: isDev ? "/" : "//static11.elemecdn.com/eleme/enterprise.employee_fe/",
      filename: isDev?'[name].js':'[name].[chunkhash:8].js'
    },

    resolve: resolve,

    devServer: {
      hot: true,
      inline: true,
      contentBase: path.resolve(__dirname, 'dev'),
      port: 9005
    },

    devtool: devtool,

    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|otf)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }]
        },

        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  ['es2015', {module: false}], 
                  'react', 
                  'stage-1'
                ]
              }
            }
          ],
          exclude: /node_modules/
        },

        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    cssnext({ browsers: ['last 2 versions', 'Android >= 2.1', 'iOS >= 7.0'] }),
                    postcssFlexFallback(),
                    postcssPx2rem({ remUnit: 75 })
                  ];
                }
              }
            }, {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded'
              }
            }]
          })
        }
      ]
    }
  };

  return conf;
};
