'use strict';

var index = require('../lib/controllers/index');

module.exports = function(app) {

  app.get('/test', function *() {
    console.log('test');
  });

  app.get('/modules/:url', index.modules);
  app.get('/', index.index);
};
