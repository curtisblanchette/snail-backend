'use strict';

const userService = require('../services/user-service');

exports.registerUser = (req, res) => {
  userService.registerUser(req.body).then((out) => {
    res.status(200);
    res.json(out);
  }, (err) => {
    res.status(500);
    res.json({error: err});
  });
};