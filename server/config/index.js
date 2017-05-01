'use strict';

const mlab = require('./config').mlab;

module.exports = {
  getDbConnection() {
    return `mongodb://${mlab.uname}:${mlab.pwd}@ds019886.mlab.com:19886/problemset`;
  },
};
