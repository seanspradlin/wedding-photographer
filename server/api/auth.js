const express = require('express');
const router = express.Router();

/**
 * @api {get} /auth Get current user profile
 * @apiName GetAuth
 * @apiGroup Auth
 * 
 * @apiSuccess  {ObjectId}  id        Unique user identifier
 * @apiSuccess  {String}    firstName First name
 * @apiSuccess  {String}    lastName  Last name
 * @apiSuccess  {String}    email     Email
 * 
 * @apiError Unauthorized
 */
router.get('/', (req, res) => {

});

/**
 * @api {post}  /auth/register  Submit registration information
 * @apiName PostAuthRegister
 * @apiGroup Auth
 * 
 * @apiParam  {String}  firstName First name
 * @apiParam  {String}  lastName  Last name
 * @apiParam  {String}  email     Email
 * @apiParam  {String}  password  Password
 * 
 * @apiSuccess  {ObjectId}  id        Unique user identifier
 * @apiSuccess  {String}    firstName First name
 * @apiSuccess  {String}    lastName  Last name
 * @apiSuccess  {String}    email     Email
 * 
 * @apiError UnprocessableEntity
 */
router.post('/register', (req, res) => {

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
 * @apiSuccess  {String}    firstName First name
 * @apiSuccess  {String}    lastName  Last name
 * @apiSuccess  {String}    email     Email
 * 
 * @apiError UnprocessableEntity
 * @apiError Unauthorized
 */
router.post('/login', (req, res) => {

});

/**
 * @api {post}  /auth/logout  Logout of an account
 * @apiName PostAuthLogout
 * @apiGroup Auth
 */
router.post('/logout', (req, res) => {

});

module.exports = router;

