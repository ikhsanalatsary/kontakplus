'use strict';

import auth from 'basic-auth';
import { admin } from './config/config.js';

const basicAuth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
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
