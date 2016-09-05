'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(User.findById);

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  process.nextTick(() => {
    User.findOne({ 'local.email': email }, (e, u) => {
      if (e) done(e);
      else if (u) done(null, false, 'email taken');
      else {
        const newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(e => {
          if (e) throw e;
          else done(null, newUser);
        });
      }
    });
  });
}));

module.exports = passport;

