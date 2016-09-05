'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  local: {
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

userSchema.methods.generateHash =
  password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

userSchema.methods.validPassword =
  password => bcrypt.compareSync(password, this.local.password);

module.exports = mongoose.model('User', userSchema);

