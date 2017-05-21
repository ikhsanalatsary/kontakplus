import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import errorhandler from 'errorhandler';
import config from './config';

// Mongodb Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnection())
  .then(() => console.info('Connected to database')) // eslint-disable-line no-console
  .catch((err) => console.error(err)); // eslint-disable-line no-console

// Application setup.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.set('PORT', process.env.PORT || 3000);

const clientPath = path.join(__dirname, '/../client');
if (process.env.NODE_ENV === 'development') app.use(errorhandler());
app.use(express.static(clientPath));
app.get('/contacts/*', (req, res) => res.sendFile(path.join(__dirname, '/../client/index.html')));
app.use('/api/contacts', require('./routes'));

app.listen(app.get('PORT'), () => {
  console.log(`Our app listening on port ${app.get('PORT')}!`); // eslint-disable-line no-console
});

module.exports = app;
