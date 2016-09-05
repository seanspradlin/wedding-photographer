'use strict';
module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost/wedding-photographer',
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL || '',
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  session: {
    secret: process.env.SESSION_SECRET || 'hunter2',
    resave: false,
    saveUninitialized: true,
  },
  port: process.env.PORT || '8080',
};

