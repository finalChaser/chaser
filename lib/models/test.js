'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TestSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Test', TestSchema);
