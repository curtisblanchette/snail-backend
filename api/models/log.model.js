'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Defines the Mongoose Call Log Schema
 *
 */
const LogSchema = new Schema({
  time: {
    type: Date,
    default: new Date().toISOString()
  },
  method: {
    type: String
  },
  endpoint: {
    type: String
  },
  requestBody: {
    type: Object
  }
});

module.exports = mongoose.model('Log', LogSchema);
