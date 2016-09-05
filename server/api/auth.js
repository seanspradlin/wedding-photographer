const express = require('express');
const passport = require('../lib/passport');
const utils = require('../lib/utils');
const router = express.Router();
const User = require('../models/user');

/**
 * @api {get} /auth Get current user profile
 * @apiName GetAuth
 * @apiGroup Auth
 * 
 * @apiSuccess  {ObjectId}  id        Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 * 
 * @apiUse UnauthorizedError
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.status(201).end();
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
 * @apiSuccess  {ObjectId}  id        Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 * 
 * @apiUse UnprocessableEntityError
 */
router.post('/register', (req, res) => {
  const required = ['name', 'email', 'password'];
  if (!utils.checkProperties(required, req.body)) res.status(422).end();
  else {
    const user = new User();
    user.local.name = req.body.name;
    user.local.email = req.body.email;
    user.local.password = user.generateHash(req.body.password);
    user.save((error) => {
      if (error) res.status(500).end();
      else {
        req.login(user, (error) => {
          if (error) res.status(500).end();
          else res.json(user);
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
 * @apiSuccess  {ObjectId}  id        Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 * 
 * @apiUse UnprocessableEntityError
 * @apiUse UnauthorizedError
 */
router.post('/login', (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    } else if (!user) res.status(401).end();
    else res.json(user);
  });
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

module.exports = router;

