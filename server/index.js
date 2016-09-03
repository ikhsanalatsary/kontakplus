'use strict';

import express from 'express';
import morgan from 'morgan';
import basicAuth from './middleware.js';
import mongoose from 'mongoose';
import config from './config';

// Application setup.
const app = express();
app.use(morgan('dev'));
app.set('PORT', process.env.PORT || 3000);
mongoose.connect(config.getDbConnection());

app.get('/', function (req, res) {
  res.send("No Authorization");
});

app.use(basicAuth);
app.get('/api', function (req, res) {
  res.status(200).json({ "greet": "Hello from express!" });
});

app.listen(app.get('PORT'), function () {
  console.log('Example app listening on port 3000!');
});
