'use strict';
const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  email: {
    type: String,
    default: ''
  }
});

