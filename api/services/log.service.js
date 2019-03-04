'use strict';

const mongoose = require('mongoose');
const LogModel = mongoose.model('Log');


/**
 * Logs each request to MongoDB
 * @param req - the request
 * @returns {Promise}
 */
exports.logRequest = (req) => {
  return new Promise((resolve, reject) => {
    const new_log = new LogModel({date: new Date().toISOString(), method: req.method, endpoint: req.url, requestBody: req.body});
    new_log.save((err, entry) => {
      if (err) {
        reject(err);
      }
      resolve(entry);
    });
  });
};

/**
 * Get All request logs
 * @returns {Promise} - Results Array<LogModel>
 */
exports.getRequestLogs = () => {
  return new Promise((resolve, reject) => {
    LogModel.find({}, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
