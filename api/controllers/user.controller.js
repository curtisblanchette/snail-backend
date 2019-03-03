'use strict';

const userService = require('../services/user.service');

/**
 * Register method
 * @param req
 * @param res
 * @status 200 - call succeeded
 * @status 500 - call failed
 */
exports.register = (req, res) => {
  console.log('called register', req.body);
  userService.register(req).then((entry) => {
    res.status(200);
    res.json(result);
  }, (err) => {
    res.status(500);
    res.json({error: err});
  });
};


/**
 * Login method
 * @param req
 * @param res
 * @status 200 - call succeeded
 * @status 500 - call failed
 */
exports.login = (req, res) => {
  userService.login(req).then((result) => {
    res.status(200);
    res.json(result);
  }, (err) => {
    res.status(500);
    res.json({error: err});
  });
};