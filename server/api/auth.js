const express = require('express');
const request = require('request').defaults({ json: true });
const utils = require('../lib/utils');
const router = express.Router();
const User = require('../models/user');
const winston = require('winston');
const config = require('../config');

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
 * @api {post}  /auth/register  Create a local account
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
    User.findOne({ 'local.email': req.body.email }, (error, user) => {
      if (error) res.status(500).end();
      else if (user) res.status(422).end();
      else {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.local.email = req.body.email;
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
 * @api {post}  /auth/local Login to a local account
 * @apiName PostAuthLocal
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
router.post('/local', (req, res) => {
  const required = ['email', 'password'];
  if (!utils.checkProperties(required, req.body)) res.status(422).end();
  else {
    User.findOne({ 'local.email': req.body.email })
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
 * @api {post} /auth/facebook Login with Facebook
 * @apiName PostAuthFacebook
 * @apiGroup Auth
 * @apiDescription Use one of Facebook's SDKs to log in and then
 * send that access token to generate a user session.
 *
 * @apiParam {String} accessToken Facebook account access token
 * 
 * @apiSuccess  {ObjectId}  _id       Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 *
 * @apiUse UnprocessableEntityError
 * @apiUse UnauthorizedError
 */
router.post('/facebook', (req, res) => {
  if (!req.body.accessToken) res.status(422).end();
  else {
    const userUri = `https://graph.facebook.com/me`
                  + `?fields=id,name,email`
                  + `&client_id=${config.facebook.appId}`
                  + `&client_secret=${config.facebook.secret}`
                  + `&access_token=${req.body.accessToken}`;

    request(userUri, (e, rs, userInfo) => {
      if (e) res.status(401).end();
      else {
        User.findOne({ 'facebook.id': userInfo.id })
          .then(user => {
            if (!user) {
              const tokenUri = `https://graph.facebook.com/oauth/access_token`
                             + `?grant_type=fb_exchange_token`
                             + `&client_id=${config.facebook.appId}`
                             + `&client_secret=${config.facebook.secret}`
                             + `&fb_exchange_token=${req.body.accessToken}`;
              request(tokenUri, (e, rs, token) => {
                if (e) res.stsatus(500).end();
                else {
                  const newUser = new User();
                  newUser.name = userInfo.name;
                  newUser.email = userInfo.email;
                  newUser.facebook.id = userInfo.id;
                  newUser.facebook.token = token.replace('access_token=', '');
                  newUser.save(error => {
                    if (error) {
                      winston.error(error);
                      res.status(500).end();
                    } else {
                      req.login(newUser, (error) => {
                        if (error) res.status(500).end();
                        else res.json({
                          _id: newUser._id,
                          name: newUser.name,
                          email: newUser.email,
                        });
                      });
                    }
                  })
                }
              });
            } else if (user.facebook.id === userInfo.id) {
              res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
              });
            } else res.status(401).end();
          })
          .catch(error => {
            winston.error(error);
            res.status(500).end();
          });
      }
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

module.exports = router;

