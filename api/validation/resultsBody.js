'use strict';
const Joi = require('joi');

module.exports = {
  body: {
    wellHeight: Joi.number().required(),
    initialClimb: Joi.number().required(),
    nightlySlide: Joi.number().required(),
    fatigue: Joi.number().required()
  }
};