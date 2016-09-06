'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = Promise;

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
  },
  google: {
    id: String,
    token: String,
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

