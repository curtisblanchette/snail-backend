'use strict';

const userController = require('../controllers/user-controller');

module.exports = function (app) {

  app.route('/users/register')
    .post(userController.registerUser);

};