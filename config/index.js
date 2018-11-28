// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

const defaultConfig = {
  index: path.resolve(__dirname, '../public/index.html'),
  assetsRoot: path.resolve(__dirname, '../public'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/public',
  productionSourceMap: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report,
  env: {
    NODE_ENV: '"development"'
  },
  port: 3001,
  autoOpenBrowser: false,
  cssSourceMap: false,
  db: {
    uri: 'mongodb://10.222.47.146:27017/fabric-console'
  }
};

module.exports = {
  development: {
    ...defaultConfig,
    assetsPublicPath: '/',
    cssSourceMap: true,
    webpackConfig: 'webpack.dev.conf'
  },
  qa: {
    ...defaultConfig,
    webpackConfig: 'webpack.test.conf',
    env: {
      NODE_ENV: '"qa"'
    }
  },
  production: {
    ...defaultConfig,
    webpackConfig: 'webpack.prod.conf',
    env: {
      NODE_ENV: '"production"'
    }
  }
};
