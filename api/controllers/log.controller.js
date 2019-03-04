'use strict';

const logService = require('../services/log.service');

/**
 * Get All request logs
 * @param req
 * @param res
 * @status 200 - call succeeded
 * @status 500 - call failed
 */
exports.getRequestLogs = (req, res) => {
  logService.getRequestLogs(req).then((result) => {
    res.status(200);
    res.json(result);
  }, (err) => {
    res.status(500);
    res.json({error: err});
  });
};