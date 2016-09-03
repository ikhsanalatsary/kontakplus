'use strict';

import chai from 'chai';
import request from 'supertest';
import btoa from 'btoa';
import faker from 'Faker';
const admin = require('../config/config').admin;

describe('Routing', function () {
  let url = 'http://localhost:3000';
  let api = 'http://localhost:3000/api/contacts';
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

    describe("GET /api/contacts", function () {
      it('should get status 200 if Authorized and return json', function (done) {
        request(api)
          .get('/')
          .set(config.authorization)
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    });

  });

  describe("POST '/api/contacts'", function () {
    it('should post and get response status 200', function (done) {
      var contact = {
        name: faker.Name.findName(),
        title: 'Coder',
        email: faker.Internet.email(),
        phone: faker.PhoneNumber.phoneNumber(),
        address: faker.Address.streetAddress(),
        company: faker.Company.companyName(),
      };
      request(api)
        .post('/')
        .set(config.authorization)
        .send(contact)
        .expect(200, done);
    });
  });
});
