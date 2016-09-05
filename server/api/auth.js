const express = require('express');
const passport = require('../lib/passport');
const utils = require('../lib/utils');
const router = express.Router();
const User = require('../models/user');
const winston = require('winston');

/**
 * @api {get} /auth Get current user profile
 * @apiName GetAuth
 * @apiGroup Auth
 *
 * @apiSuccess  {ObjectId}  _id       Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 *
 * @apiUse UnauthorizedError
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else res.status(401).end();
});

/**
 * @api {post}  /auth/register  Submit registration information
 * @apiName PostAuthRegister
 * @apiGroup Auth
 *
 * @apiParam  {String}  name      Name
 * @apiParam  {String}  email     Email
 * @apiParam  {String}  password  Password
 *
 * @apiSuccess  {ObjectId}  _id       Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 *
 * @apiUse UnprocessableEntityError
 */
router.post('/register', (req, res) => {
  const required = ['name', 'email', 'password'];
  if (!utils.checkProperties(required, req.body)) res.status(422).end();
  else {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) res.status(500).end();
      else if (user) res.status(422).end();
      else {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.local.password = newUser.generateHash(req.body.password);
        newUser.save((error) => {
          if (error) res.status(500).end();
          else {
            req.login(newUser, (error) => {
              if (error) res.status(500).end();
              else res.json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
              });
            });
          }
        });
      }
    });
  }
});

/**
 * @api {post}  /auth/login Login to an account
 * @apiName PostAuthLogin
 * @apiGroup Auth
 *
 * @apiParam  {String}  email     Email
 * @apiParam  {String}  password  Password
 *
 * @apiSuccess  {ObjectId}  _id       Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 *
 * @apiUse UnprocessableEntityError
 * @apiUse UnauthorizedError
 */
router.post('/login', (req, res) => {
  const required = ['email', 'password'];
  if (!utils.checkProperties(required, req.body)) res.status(422).end();
  else {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) res.status(401).end();
        else {
          if (!user.validPassword(req.body.password)) res.status(401).end();
          else {
            req.login(user, (error) => {
              if (error) res.status(500).end();
              else res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
              });
            });
          }
        }
      })
    .catch(error => {
      winston.error(error);
      res.status(500).end();
    });
  }
});

/**
 * @api {post}  /auth/logout  Logout of an account
 * @apiName PostAuthLogout
 * @apiGroup Auth
 */
router.post('/logout', (req, res) => {
  req.logout();
  res.status(204).end();
});

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;

