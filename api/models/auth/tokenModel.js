'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

/**
 * Defines the Mongoose Token Schema
 *
 */
const TokenSchema = new Schema({
  accessToken: String,
  accessTokenExpiresAt: Date,
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  client: Object,
  user: Object
});

module.exports = mongoose.model('Token', TokenSchema);
