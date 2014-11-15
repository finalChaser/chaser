'use strict';

var path = require('path'),
  config = require('./config'),
  middlewares = require('koa-middlewares'),
  koaStatic = require('koa-static'),
  koaViews = require('koa-views');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'development') {
    console.log('process.env.NODE_ENV: development');
    app.use(require('koa-livereload')());
    app.use(koaStatic(path.join(config.root, '.tmp')));
    app.use(koaStatic(path.join(config.root, 'app')));

    app.use(koaViews(config.root + '/app/views'));

  } else if (process.env.NODE_ENV === 'production') {
    var publicFiles = koaStatic(path.join(config.root, 'public'));
    //publicFiles._name = 'static /public';

    app.use(publicFiles);
    app.set('views', config.root + '/views');
  }

  app.use(middlewares.bodyParser());
  app.use(middlewares.router(app));
  //this.set('view engine', 'html');

};
