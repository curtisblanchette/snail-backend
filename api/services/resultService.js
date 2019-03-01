'use strict';

const mongoose = require('mongoose'),
  ResultModel = mongoose.model('Result');

/**
 * Computes the request parameters to solve snail problem.
 * @param req - request
 * @returns {Promise} - Returns the promise to the controller.
 */
exports.computeClimb = (req) => {
  return new Promise((resolve, reject) => {

    const params = {
      wellHeight: req.body.wellHeight,
      initialClimb: req.body.initialClimb,
      nightlySlide: req.body.nightlySlide,
      fatigue: req.body.fatigue,
      result: null
    };

    let day = 0;
    let initialHeight = 0;
    let distanceClimbed = 0;
    let heightAfterClimbing = 0;
    let heightAfterSliding = 0;
    let results = [];

    do {
      distanceClimbed = getDistanceClimbed(initialHeight, params.initialClimb, day, day !== 0);
      heightAfterClimbing = getHeightAfterClimbing(initialHeight, distanceClimbed);

      results.push({
        initialHeight: initialHeight,
        distanceClimbed: distanceClimbed,
        heightAfterClimbing: heightAfterClimbing,
        heightAfterSliding: getInitialHeight(heightAfterClimbing)
      });

      initialHeight =	getInitialHeight(heightAfterClimbing);

      day++;
    } while(!finished());

    console.log(results);

    // returns the distance climbed for the day
    function getDistanceClimbed(_initialHeight, _initialClimb, _day, _isFatigued) {
      let x = _initialClimb;
      if(_isFatigued) {
        x = x - (_initialClimb * (params.fatigue/100) * _day);
      }
      return x;
    }


    if (heightAfterClimbing > params.wellHeight) {
      params.result = `Success on day ${day}`;
    } else {
      params.result = `Failure on day ${day}`;
    }

    resolve(params);

    function getHeightAfterClimbing(_initialHeight, _distanceClimbed) {
      return _initialHeight + _distanceClimbed;
    }

    // returns the starting height for the next day
    function getInitialHeight(_heightAfterClimbing) {
      return _heightAfterClimbing - params.nightlySlide;
    }

    function finished() {
      return heightAfterClimbing > params.wellHeight || heightAfterClimbing <= 0 || (heightAfterSliding <= 0 && day !== 0);
    }
  });

};

/**
 * Persist the results to mongoDB
 * @param results - results in SnailModel format
 * @returns {Promise} - returns Promise to the controller
 */
exports.persistResults = (results) => {
  return new Promise((resolve, reject) => {
    const new_entry = new ResultModel(results);
    new_entry.save((err, entry) => {
      if (err) {
        reject(err);
      }
      resolve(entry);
    });
  });
};

/**
 * Get all results from mongoDB
 * @returns {Promise} - Results Array<SnailModel>
 */
exports.getResults = () => {
  return new Promise((resolve, reject) => {
    ResultModel.find({}, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};


