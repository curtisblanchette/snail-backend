'use strict';

const app = require('../../server');
const logService = require('../services/log-service');
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

module.exports.authenticateRequest = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  return app.oauth.authenticate(request, response)
    .then((token) => {
      next();
    }).catch((err) => {
      res.status(err.code || 500).json(err);
    });
};

/**
 * Middleware to log request data to Logs table
 * @param req - request
 * @param res - response
 * @param next - continue
 */
exports.callLogger = (req, res, next) => {
  logService.logRequest(req).then(()=>{
    next();
  }, (err) => {
    console.log('error logging call', err);
    next();
  });
};
