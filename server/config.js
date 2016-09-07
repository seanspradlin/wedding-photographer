'use strict';
module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost/wedding-photographer',
  },
  facebook: {
    appId: process.env.FACEBOOK_CLIENT_ID || '',
    secret: process.env.FACEBOOK_CLIENT_SECRET || '',
  },
  google: {
    appId: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || '8080',
  session: {
    secret: process.env.SESSION_SECRET || 'hunter2',
    resave: false,
    saveUninitialized: true,
  },
};

