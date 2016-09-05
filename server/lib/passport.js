'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user);
  });
});

passport.use('local', new LocalStrategy(
  (email, password, done) => {
    User.findOne({ email }, (error, user) => {
      if (error) done(error);
      else if (!user) done(null, false, { error: 'No user found' });
      else if (!user.validPassword(password)) {
        done(null, false, { error: 'Invalid password' });
      } else done(null, user);
    });
  }
));

module.exports = passport;

