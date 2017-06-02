var cssnext = require('postcss-cssnext')
var postcssFlexFallback = require('postcss-flex-fallback')
var postcssPx2rem = require('postcss-px2rem')

module.exports = {
  postcss: function() {
    return [
      cssnext({ browsers: ['last 2 versions', 'Android >= 2.1', 'iOS >= 7.0'] }),
      postcssFlexFallback(),
      //postcssPx2rem({ remUnit: 75 })
    ];
  }
}
