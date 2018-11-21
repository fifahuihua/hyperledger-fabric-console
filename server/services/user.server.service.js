'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.listUsers = async function() {
  return User.find({});
};