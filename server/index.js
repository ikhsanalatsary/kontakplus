'use strict';

import express from 'express';
import morgan from 'morgan';
import basicAuth from './middleware.js';
import mongoose from 'mongoose';
import config from './config';
import bodyParser from 'body-parser';

// Application setup.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('PORT', process.env.PORT || 3000);
mongoose.connect(config.getDbConnection(), function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', function (req, res) {
  res.send("No Authorization");
});

app.use(basicAuth);
app.use('/api/contacts', require('./routes'));

app.get('/api', function (req, res) {
  res.status(200).json({ "greet": "Hello from express!" });
});

app.listen(app.get('PORT'), function () {
  console.log('Example app listening on port 3000!');
});
