'use strict';

const userController = require('../controllers/user.controller');

module.exports = function (app) {

  app.route('/users/register')
    .post(userController.register);

  app.route('/users/login')
    .post(userController.login);

};
