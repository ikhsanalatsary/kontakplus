'use strict';

import express from 'express';
import morgan from 'morgan';
import basicAuth from './middleware.js';

// Application setup.
const app = express();
app.use(basicAuth);
app.use(morgan('dev'));
app.set('PORT', process.env.PORT || 3000);

// Setup route.
app.get('/', function (req, res) {
  console.log(req.body);
  res.status(200).json({ greet: 'Hello from express!' });
});

app.listen(app.get('PORT'), function () {
  console.log('Example app listening on port 3000!');
});
