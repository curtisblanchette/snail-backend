'use strict';

const interceptors = require('../middleware/interceptors');
const controller = require('../controllers/result-controller');

module.exports = function (app) {

  app.route('/')
    .get(controller.getRoute);

  // Results Routes
  app.route('/results')
    .get(interceptors.callLogger, controller.getResults)
    .post(interceptors.callLogger, controller.postResults);

};
