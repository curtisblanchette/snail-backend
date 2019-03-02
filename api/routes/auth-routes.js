'use strict';

const authController = require('../controllers/auth-controller');

module.exports = function (app) {

  app.all('/oauth/token', authController.obtainToken);

};