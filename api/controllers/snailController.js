'use strict';

const mongoose = require('mongoose'),
  snailService = require('../services/snailService');

exports.getRoute = (req, res) => {
  res.send('<h1>Snail API v1.0.0</h1>');
};

exports.postClimb = (req, res) => {
  snailService.computeClimbAndPersist(req).then((result) => {
    res.send(result); // TODO return json i.e. res.send
  });
};
