'use strict';

const mongoose = require('mongoose');
const ResultModel = mongoose.model('Result');
const lodash = require('lodash');

/**
 * Computes the request parameters to solve snail problem.
 * @param req - request
 * @returns {Promise} - Returns promise to controller.
 */
exports.computeClimb = (body) => {
  return new Promise((resolve, reject) => {

    const params = {
      time: new Date().toISOString(),
      wellHeight: body.wellHeight,
      initialClimb: body.initialClimb,
      nightlySlide: body.nightlySlide,
      fatigue: body.fatigue,
      result: null,
      distanceClimbed: null,
      daysToComplete: null
    };

    let day = 0;
    let initialHeight = 0;
    let distanceClimbed = 0;
    let heightAfterClimbing = 0;
    let heightAfterSliding = 0;

    do {
      distanceClimbed = getDistanceClimbed(params.initialClimb, day, day !== 0);
      heightAfterClimbing = getHeightAfterClimbing(initialHeight, distanceClimbed);
      initialHeight =	getInitialHeight(heightAfterClimbing);
      heightAfterSliding = initialHeight;

      day++;
      params.daysToComplete = day;
      params.distanceClimbed += distanceClimbed;

    } while(!hasReachedTop() && !hasFailed());

    if (hasFailed()) {
      params.result = `Failure on day ${day}`;
    } else if (hasReachedTop()) {
      params.result = `Success on day ${day}`;
    }

    resolve(params);

    function getDistanceClimbed(_initialClimb, _day, isFatigued) {
      let x = _initialClimb;
      if(isFatigued) {
        x = x - (_initialClimb * (params.fatigue / 100) * _day);
      }
      return x;
    }
    function getHeightAfterClimbing(_initialHeight, _distanceClimbed) {
      return _initialHeight + _distanceClimbed;
    }
    function getInitialHeight(_heightAfterClimbing) {
      return _heightAfterClimbing - params.nightlySlide;
    }
    function hasReachedTop() {
      return heightAfterClimbing > params.wellHeight;
    }
    function hasFailed() {
      return Math.sign(heightAfterSliding) === -1 || heightAfterClimbing <= 0;
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

/**
 * Aggregate data for monitoring averages ( ie. successRate, daysToComplete, distanceClimbed )
 * @returns {Promise}
 */
exports.aggregateResults = () => {
  return new Promise((resolve, reject) => {
    ResultModel.find({}, 'result distanceClimbed daysToComplete', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve({
        successRate: getSuccessRate(results),
        averageTotalDistanceClimbed: getAverageTotalDistance(results),
        averageTime: getAverageTimesInDays(results)
      });
    });

    function getSuccessRate(data) {
      let success = 0;
      let failure = 0;

      lodash.each(data, (item) => {
        item.result.includes('Success') ? success++ : failure++;
      });

      return {
        success: success,
        failure: failure
      };
    }

    function getAverageTotalDistance(data) {
      let distanceClimbed = 0;

      lodash.each(data, (item) => {
        distanceClimbed += item.distanceClimbed;
      });

      return distanceClimbed / data.length;
    }

    function getAverageTimesInDays(data) {
      let totalSuccessDays = 0;
      let totalFailureDays = 0;
      let successCount = 0;
      let failureCount = 0;

      lodash.each(data, (item) => {
        if (item.result.includes('Success')) {
          successCount++;
          totalSuccessDays += item.daysToComplete;
        }
        if (item.result.includes('Failure')) {
          failureCount++;
          totalFailureDays += item.daysToComplete;
        }
      });
      return {
        averageSuccessDays: totalSuccessDays / successCount,
        averageFailureDays: totalFailureDays / failureCount
      };
    }
  });
};
