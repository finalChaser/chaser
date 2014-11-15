'use strict';

var path = require('path');

/**
 * 校验页面是否存在
 */
exports.modules = function*() {
  //console.log('enter direct');
  var requestedView = path.join('./modules/', this.params.url);
  yield this.render(requestedView, function(err, html) {
    if(err) {
      console.log("Error rendering partial '" + requestedView + "'\n", err);
      //res.send(404);
    } else {
      //res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function*() {
  //console.log('enter index');
  yield this.render('index');
};
