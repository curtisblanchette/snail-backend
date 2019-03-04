'use strict';

const interceptors = require('../middleware/interceptors');
const controller = require('../controllers/result.controller');
const validator = require('express-joi-validator');
const resultsBody = require('../validation/resultsBody');

module.exports = function (app) {

  app.route('/')
    .get(controller.getRoute);

  // Results Routes
  app.route('/results')
    .get(interceptors.callLogger, controller.getResults)
    .post(validator(resultsBody), interceptors.callLogger, controller.postResults);

  app.route('/results/aggregate')
    .get(controller.aggregateResults);

};
