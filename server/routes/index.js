'use strict';

const UserController = require('../controllers/user.server.controller');
const EnvController = require('../controllers/env.server.controller');

module.exports = function (app) {
  app.route('/api/admin/login').post(UserController.login);
  app.route('/api/admin/logout').post(UserController.logout);
  app.route('/api/user/login').post(UserController.login);
  app.route('/api/user/list').get(UserController.list);
  app.route('/api/admin/info').get(UserController.adminInfo);
  app.route('/api/user/count').get(UserController.userCount);
  app.route('/api/user/checkSession').get(UserController.checkSession);

  app.route('/api/env/checkVersion/:appType').get(EnvController.checkVersion);
};