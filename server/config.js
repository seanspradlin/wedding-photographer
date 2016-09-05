'use strict';
module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost/wedding-photographer',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'hunter2',
  },
  port: process.env.PORT || '8080',
};

