'use strict';

const logService = require('../services/log.service');

/**
 * Middleware to log request data to new table
 * @param req - request
 * @param res - response
 * @param next - continue
 */
exports.callLogger = (req, res, next) => {
  // log the call to mongoDB table
  logService.logRequest(req).then(()=>{
    next();
  }, (err) => {
    console.log('error logging call', err);
    next();
  });
};
