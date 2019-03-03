'use strict';

const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const Bcrypt = require('bcrypt');


/**
 * Login with user credentials
 * uses bcrypt to compare password against hashed database password
 * @param req - the request
 * @returns {Promise}
 */
exports.login = (req) => {
  return new Promise((resolve, reject) => {
    UserModel.find({username: req.body.username}, (err, user) => {
      if (err) {
        reject(err);
      }
      Bcrypt.compare(req.body.password, user[0].password).then(
        (result) => {
          if(result) {
            resolve({success: result, user: user});
          } else {
            reject('Wrong username/password.');
          }
        }, (err) => {
          reject(err);
      });
    });
  });
};

/**
 * Register new user with backend
 * password is hashed using bcrypt
 * @returns {Promise} - Results Array<LogModel>
 */
exports.register =  (req) => {
  return new Promise((resolve, reject) => {
    Bcrypt.hash(req.body.password, 10, (err, hash) => {
      const new_user = new UserModel({username: req.body.username, password: hash});
      new_user.save((err, entry) => {
        if (err) {
          reject(err);
        }
        resolve(entry);
      });
    });
  });
};
