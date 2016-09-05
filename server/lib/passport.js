'use strict';
const passport = require('passport');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user);
  });
});

passport.use('facebook', new FacebookStrategy(config.facebook,
  (token, refreshToken, profile, done) => {
    User.findOne({ 'facebook.id': profile.id }, (error, user) => {
      if (error) done(error);
      else if (user) done(null, user);
      else {
        const newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = profile.token;
        newUser.name = `${profile.name.givenName} ${profile.name.familyName}`;
        newUser.email = profile.emails[0].value;
        newUser.save((e) => {
          if (e) throw e;
          else done(null, newUser);
        });
      }
    });
  }
));

module.exports = passport;

