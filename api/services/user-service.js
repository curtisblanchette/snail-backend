'use strict';

const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

exports.registerUser = (body) => {
  return new Promise((resolve, reject) => {

    const new_user = new UserModel({username: body.username, password: body.password});

    new_user.save((err, entry) => {
      if (err) {
        reject(err);
      }
      resolve(entry);
    });
  });
};