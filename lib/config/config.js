'use strict';

var _ = require('underscore');

module.exports = _.extend(
  require('./env/all.js'),
  require('./env/' + process.env.NODE_ENV + '.js') || {}
);

