var utils = require('./utils')
var config = require('../config')[process.env.NODE_ENV];
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.cssSourceMap,
    extract: isProduction
  })
}
