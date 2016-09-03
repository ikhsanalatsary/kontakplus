'use strict';

import chai from 'chai';
import request from 'supertest';
import btoa from 'btoa';
const admin = require('../config/config').admin;

describe('Routing', function () {
  let url = 'http://localhost:3000';
  let base64Str = btoa(`${admin.user}:${admin.password}`);
  let config = {
    authorization: {
      "Authorization": `Basic ${base64Str}`,
      "Accept": "application/json",
    },
    unauthorization: {
      "WWW-Authenticate": "Basic realm=Authorization Required",
    },
  };

  describe('GET /', function () {
    it('should get status code 200 with no auth', function (done) {
      request(url)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  describe('GET /api', function () {
    it('should get status code 401 if not Unauthorized', function (done) {
      request(url)
        .get('/api')
        .set(config.unauthorization)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(401, done);
    });

    it('should get status 200 if Authorized', function (done) {
      request(url)
        .get('/api')
        .set(config.authorization)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
