'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Defines the Mongoose Result Schema per requirements
 *
 * Example:
 * {
 *  _id: <ObjectId>,
 *  time: <ISODate>,
 *  wellHeight: <NumberDecimal>
 *  initialClimb: <NumberDecimal>,
 *  nightlySlide: <NumberDecimal>,
 *  fatigue: <NumberDecimal>,
 *  result: <String>
 * }
 */
const ResultSchema = new Schema({
  time: {
    type: Date,
    default: new Date().toISOString()
  },
  wellHeight: {
    type: mongoose.Schema.Types.Decimal,
    default: 0
  },
  initialClimb: {
    type: mongoose.Schema.Types.Decimal,
    default: 0
  },
  nightlySlide: {
    type: mongoose.Schema.Types.Decimal,
    default: 0
  },
  fatigue: {
    type: mongoose.Schema.Types.Decimal,
    default: 0
  },
  result: mongoose.Schema.Types.String,
  distanceClimbed: mongoose.Schema.Types.Decimal,
  daysToComplete: Number

});

module.exports = mongoose.model('Result', ResultSchema);
