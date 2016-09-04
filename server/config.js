'use strict';
module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost/wedding-photographer',
  },
  api: {
    port: process.env.PORT || '8080',
  },
};

