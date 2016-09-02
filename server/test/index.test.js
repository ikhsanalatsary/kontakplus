const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;

describe('Routing', function () {
  let url = 'http://localhost:3000';

  describe('GET /', function () {
    it('should get status code 401 if not Unauthorized', function (done) {
      request(url)
        .get('/')
        .set('WWW-Authenticate', 'Basic realm=Authorization Required')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(401, done);
    });
  });
});
