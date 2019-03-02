'use strict';
const mongoose = require('mongoose');
const clientModel = mongoose.model('Client');
const tokenModel = mongoose.model('Token');
const userModel = mongoose.model('User');

exports.getAccessToken = (token) => {
  return tokenModel.findOne({
    accessToken: token
  });
};

exports.getClient = (clientId, clientSecret) => {
  return clientModel.findOne({
    clientId: clientId,
    clientSecret: clientSecret
  });
};

exports.saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  };

  token.user = {
    id: user.username || user.clientId
  };

  const tokenInstance = new tokenModel(token);

  tokenInstance.save();

  return token;
};

/**
 * Method used only by password grant type.
 */
exports.getUser = (username, password) => {
  return userModel.findOne({
    username: username,
    password: password
  });
};

/**
 * Method used only by client_credentials grant type.
 */
exports.getUserFromClient = (client) => {
  return clientModel.findOne({
    clientId: client.clientId,
    clientSecret: client.clientSecret,
    grants: 'client_credentials'
  });
};

