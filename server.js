const express = require('express');
const app = module.exports = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const OAuth2Server = require('oauth2-server');
const bodyParser = require('body-parser');

// models loaded here
const ResultModel = require('./api/models/result-model');
const LogModel = require('./api/models/log-model');
const ClientModel = require('./api/models/auth/clientModel');
const TokenModel = require('./api/models/auth/tokenModel');
const UserModel = require('./api/models/auth/userModel');

const resultRoutes = require('./api/routes/result-routes');
const logRoutes = require('./api/routes/log-routes');
const authRoutes = require('./api/routes/auth-routes');
const userRoutes = require('./api/routes/user-routes');

// mongoose instance connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SnailDB', { useNewUrlParser: true }).then(() => {
  console.log('MongoDB Connected Successfully')
}, (err) => {
  console.log('Error connecting to MongoDB', err);
});

app.oauth = new OAuth2Server({
  model: require('./api/services/auth-service'),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// register routes
resultRoutes(app);
logRoutes(app);
authRoutes(app);
userRoutes(app);

app.listen(port);

console.log('Snail RESTful API server started on: ' + port);
