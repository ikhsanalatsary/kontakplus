'use strict';

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import errorhandler from 'errorhandler';
import config from './config';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';

// Application setup.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.set('PORT', process.env.PORT || 3000);

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnection())
  .then(() =>  console.log('Connected to database'))
  .catch((err) => console.error(err));

const clientPath = path.join(__dirname, '/../client');
if (process.env.NODE_ENV === 'development') app.use(errorhandler());
app.use(express.static(clientPath));
app.get('/contacts/*', (req, res) => res.sendFile(path.join(__dirname, '/../client/index.html')));
app.use('/api/contacts', require('./routes'));

app.listen(app.get('PORT'), function () {
  console.log('Our app listening on port ' + app.get('PORT') + '!');
});
