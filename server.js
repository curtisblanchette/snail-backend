const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  ResultModel = require('./api/models/resultModel'), // model must be loaded here
  LogModel = require('./api/models/logModel'),
  bodyParser = require('body-parser');

// mongoose instance connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SnailDB', { useNewUrlParser: true }).then(() => {
  console.log('MongoDB Connected Successfully')
}, (err) => {
  console.log('Error connecting to MongoDB', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import and register routes
const resultRoutes = require('./api/routes/resultRoutes');
resultRoutes(app);

const logRoutes = require('./api/routes/logRoutes');
logRoutes(app);

app.listen(port);

console.log('Snail RESTful API server started on: ' + port);
