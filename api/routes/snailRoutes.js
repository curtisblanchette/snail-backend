'use strict';

module.exports = function (app) {
  var snailCtrl = require('../controllers/snailController');

  app.route('/')
    .get(snailCtrl.getRoute);

  // todoList Routes
  app.route('/snail')
    .post(snailCtrl.postClimb);

  //
  // app.route('/tasks/:taskId')
  //     .get(todoList.read_a_task)
  //     .put(todoList.update_a_task)
  //     .delete(todoList.delete_a_task);
};
