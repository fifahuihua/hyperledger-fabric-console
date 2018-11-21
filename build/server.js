require('./check-versions')();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const webpack = require('webpack');

let server;
const dbConn = require('./dbConn');
const config = require('../config')[process.env.NODE_ENV];

var webpackConfig = require(`./${config.webpackConfig}`);
var _resolve;
var readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

const startApp = async function() {
  let dbConnection = await dbConn.init();

  // default port where dev server listens for incoming traffic
  var port = process.env.PORT || config.port;
  var uri = 'http://localhost:' + port;
  // automatically open browser, if not set will be false
  var autoOpenBrowser = !!config.autoOpenBrowser;

  var app = express();
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  if (isDevelopmentEnv) {
    app.use(morgan('dev'));
  } else {
    app.use(compression());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
      parameterLimit: 20000,
      limit: 1024 * 1024 * 2
    })
  );

  app.use(
    bodyParser.json({
      extended: true,
      parameterLimit: 20000,
      limit: 1024 * 1024 * 2
    })
  );

  var mongoStore = new MongoStore({
    mongooseConnection: dbConnection,
    url: 'mongodb://localhost:27017/mevn-stack',
    touchAfter: 24 * 3600, // Updating the session only every 24 hours.
    autoRemove: 'interval',
    autoRemoveInterval: 30 // Removing expired sessions every 30 minutes.
  });

  // Configure the 'session' middleware
  app.use(
    session({
      name: 'MEVN_STACK_SID',
      saveUninitialized: false, // don't create session until something stored
      resave: false, // don't save session if unmodified
      secret: 'mevn-stack-session-secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 2
      },
      store: mongoStore
    })
  );

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  require('../server/routes')(app);

  if (isDevelopmentEnv) {
    var compiler = webpack(webpackConfig);

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    });

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
    });
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function(compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb();
      });
    });

    app.use(devMiddleware);
    app.use(hotMiddleware);

    console.log('> Starting dev server...');
    devMiddleware.waitUntilValid(() => {
      console.log('> Listening at ' + uri + '\n');
      // when env is testing, don't need open it
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
      }
      _resolve();
    });
  } else {
    app.use(express.static(config.assetsRoot));
    app.use('/public/static', express.static(`${config.assetsRoot}/static`));
  }

  app.use(require('connect-history-api-fallback')());
  server = app.listen(port);
  console.log(`> Listening at ${uri}\n`);
};

startApp();

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};
