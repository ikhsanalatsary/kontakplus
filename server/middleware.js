'use strict';

import auth from 'basic-auth';
const admin = require('./config/config').admin;

const basicAuth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  const user = auth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === admin.user && user.pass === admin.password) {
    return next();
  } else {
    return unauthorized(res);
  };
};

module.exports = basicAuth;
