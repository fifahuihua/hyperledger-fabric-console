'use strict';
const MockData = require('../utils/mock.data');
const CookieUtils = require('../utils/cookie.utils');
const UserService = require('../services/user.server.service');

exports.login = function(req, res) {
  CookieUtils.resetSessionIdExpiredTime(req, res, 'demoUser');
  return res.json({"status":1,"success":"登录成功", user: {id: 1, name: 'test', status: 'active'}});
};

exports.logout = function(req, res) {
  CookieUtils.clearSessionId(res);
  return res.json({"status":1,"success":"退出成功"});
};

exports.adminInfo = function(req, res) {
  return res.json({"status":1,"data": {id: 1, name: 'test', status: 'active'}});
};

exports.userCount = function(req, res) {
  return res.json({"status":1,"count":MockData.mockUsers().length});
};

exports.checkSession = function(req, res) {
  const sessionValue = CookieUtils.getSessionId(req);
  if (sessionValue) {
    return res.json({status: 'success', user: {id: 1, name: 'test', status: 'active'}});
  } else {
    return res.json({status: 'failed'});
  }
};

exports.list = async function(req, res) {
  return res.json(await UserService.listUsers());
}