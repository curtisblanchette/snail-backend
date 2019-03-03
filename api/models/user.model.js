'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Defines the Mongoose Call Log Schema
 *
 */
const UserSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
