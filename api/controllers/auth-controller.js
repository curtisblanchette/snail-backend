'use strict';

const app = require('../../server');
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

exports.obtainToken = (req, res) => {

  const request = new Request(req);
  const response = new Response(res);

  return app.oauth.token(request, response)
    .then((token) => {
      res.json(token);
    }).catch((err) => {
      res.status(err.code || 500).json(err);
    });
};

