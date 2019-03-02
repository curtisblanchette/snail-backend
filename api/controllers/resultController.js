'use strict';

const resultService = require('../services/resultService');

/**
 * Serve the API version on baseURL
 * @param req - request
 * @param res - response
 */
exports.getRoute = (req, res) => {
  res.send(`<h1>Snail API v1</h1>`);
};

/**
 * Passes the request body to resultService to perform computation and persistence.
 * @param req - request
 * @param res - response
 * @status 200 - call succeeded
 * @status 500 - call failed
 */
exports.postResults = async (req, res) => {

  const result = await resultService.computeClimb(req.body);

  resultService.persistResults(result).then((out)=> {
    res.status(200);
    res.json(out);
  }, (err) => {
    res.status(500);
    res.json({error: err});
  });
};

/**
 * Get All Results
 * @param req - request
 * @param res - response
 * @status 200 - call succeeded
 * @status 500 - call failed
 */
exports.getResults = (req, res) => {
  resultService.getResults().then(result => {
    res.status(200);
    res.json(result);
  }, (err) => {
    res.status(500);
    res.json({error: err});
  });
};
