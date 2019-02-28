'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 _id: <ObjectId>,
 time: <ISODate>,
 wellHeight: <NumberDecimal>
 initialClimb: <NumberDecimal>,
 nightlySlide: <NumberDecimal>,
 fatigue: <NumberDecimal>,
 result: <String>

 */
const SnailSchema = new Schema({
  _id: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  time: {
    type: Date,
    default: new Date().toISOString()
  },
  wellHeight: {
    type: Number,
    default: 0
  },
  initialClimb: {
    type: Number,
    default: 0
  },
  nightlySlide: {
    type: Number,
    default: 0
  },
  fatigue: {
    type: Number,
    default: 0
  },
  result: {
    type: String,
    default: 'Hope he made it...'
  }
});

module.exports = mongoose.model('Snail', SnailSchema);