var path = require('path')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function(env){
  var plugins = [];
  if(env != 'dev'){
    plugins.push(
      new HtmlWebpackPlugin({
        files: {
          js: 'main.[chunkhash:8].js'
        },
        filename: './index.html',
        template: './dev/tpl.html',
        inject: false
      })
    );
  }

  return {
    entry: {
      app: './src/main.js'
    },

    output: {
      path: resolve(env == 'dev' ? 'dev' : 'dist'),
      filename: env == 'dev' ? '[name].js' : '[name].[chunkhash:8].js', 
      publicPath: '/'
    },

    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },

    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },

        {
          test: /\.js$/,
          loader: 'babel-loader'
        },

        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        },

        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    }
  }
}
