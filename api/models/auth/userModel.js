'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

/**
 * Defines the Mongoose User Schema
 *
 */
const UserSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);