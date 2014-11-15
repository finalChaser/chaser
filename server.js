'use strict';

var koa = require('koa'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    http = require('http');

/**
 * Main application file
 */

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongodb.uri, config.mongodb.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Passport Configuration
//var passport = require('./lib/config/passport');

// Log4js settings
//require('./lib/config/log4js');

var app = koa();

//var server = http.createServer(app.callback()).listen(3000);
//if (process.env.NODE_ENV !== 'production') {
//    // 开发模式，初始化数据库
//    require('./lib/config/dummydata');
//}

// koa settings
require('./lib/config/koa')(app);

// Routing
require('./routes/router')(app);

// Start server
app.listen(config.port, function() {
  console.log('koa server listening on port %d in %s mode', config.port, env);
});

//开启定时任务:备份数据库，删除用户日志，产品模式下启动
//if (process.env.NODE_ENV === 'production') {
    //require('./lib/config/quartz.js').start();
//}

var logger = require('log4js').getLogger('log');

process.on('uncaughtException', function(err) {
    // handle the error safely
    logger.error('uncaughtException:', err.stack);
});

app.on('error', function(err,ctx) {
  logger.error('app error:', err, ctx);
});

// Expose app
module.exports = app;
