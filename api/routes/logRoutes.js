'use strict';

const logController = require('../controllers/logController');

module.exports = function (app) {

  // Log Routes
  app.route('/logs')
    .get(logController.getRequestLogs)
    .post(logController.logRequest);

};
