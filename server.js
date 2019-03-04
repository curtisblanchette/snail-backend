const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const ResultModel = require('./api/models/result.model'); // model must be loaded here
const LogModel = require('./api/models/log.model');
const bodyParser = require('body-parser');
const resultRoutes = require('./api/routes/results.routes');
const logRoutes = require('./api/routes/logs.routes');

// mongoose instance connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SnailDB', { useNewUrlParser: true }).then(() => {
  console.log('MongoDB Connected Successfully')
}, (err) => {
  console.log('Error connecting to MongoDB', err);
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

app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
});

module.exports = app.listen(port);


console.log('Snail RESTful API server started on: ' + port);
