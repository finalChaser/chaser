'use strict';

var path = require('path'),
  rootPath = path.normalize(__dirname + '/../../../');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  mongodb: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

