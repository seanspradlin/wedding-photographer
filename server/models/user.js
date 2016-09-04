'use strict';
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  email: String,
});

module.exports = mongoose.model('User', userSchema);

