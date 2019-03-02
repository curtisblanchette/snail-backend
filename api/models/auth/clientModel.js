'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

/**
 * Defines the Mongoose Client Schema
 *
 */
const ClientSchema = new Schema({
  clientId: String,
  clientSecret: String,
  grants: [String],
  redirectUris: [String]
});

module.exports = mongoose.model('Client', ClientSchema);
