'use strict';

var log4js = require('log4js'),
  config = require('./config');

log4js.configure({
  appenders: [
    { type: 'console'},
    { type: 'file',
      filename: 'logs/log.log',
      category: 'log',
      "layout": {
        "type": "pattern",
        "pattern": '[%d] [%p] [%x{user}] %m'
      },
      maxLogSize: 10485760,
      backups: 10
    }
  ],
  levels: {
    log: config.log4js.level
  }
});

module.exports = log4js;
