'use strict';

const logController = require('../controllers/log.controller');

module.exports = function (app) {

  // Log Routes
  app.route('/logs')
    .get(logController.getRequestLogs);

};
