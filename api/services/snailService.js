'use strict';

const mongoose = require('mongoose'),
  SnailModel = mongoose.model('Snail');

exports.computeClimbAndPersist = (req) => {
  return new Promise((resolve, reject) => {

    console.log('Request Body', req.body);

    const wellHeight = req.body.wellHeight,
      initialClimb = req.body.initialClimb,
      nightlySlide = req.body.nightlySlide,
      fatigue = req.body.fatigue / 100;

    //let initialHeight = initialClimb - nightlySlide; // first day results
    let heightAfterClimb = initialClimb;
    let heightAfterSlide = initialClimb - nightlySlide;

    for (let day = 1; day < 100; day++) {

      if (day > 1 ) {
        heightAfterClimb = heightAfterSlide + initialClimb - (fatigue * initialClimb);
        heightAfterSlide += heightAfterSlide - (fatigue * initialClimb);
      }

      console.log(`Day: ${day} | HeightAfterClimb: ${heightAfterClimb} | HeightAfterSlide: ${heightAfterSlide}`);

      if (heightAfterClimb >= wellHeight) {
        resolve(`Success on day ${day}`);
      } else if (heightAfterSlide <= 0) {
        resolve(`Failure on day ${day}`);
      }

    }

    // compute the stuff

    // save results to mongoDB
  });
};