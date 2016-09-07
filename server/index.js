'use strict';

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import errorhandler from 'errorhandler';
import config from './config';
import bodyParser from 'body-parser';
import path from 'path';

// Application setup.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('PORT', process.env.PORT || 3000);

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnection())
  .then(() =>  console.log('Connected to database'))
  .catch((err) => console.error(err));

const clientPath = path.resolve('client');
app.use(errorhandler());
app.use(express.static(clientPath));
app.use('/api/contacts', require('./routes'));

app.listen(app.get('PORT'), function () {
  console.log('Example app listening on port 3000!');
});
