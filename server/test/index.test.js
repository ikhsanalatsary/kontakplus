'use strict';

import mongoose from 'mongoose';
import chai from 'chai';
import request from 'supertest';
import btoa from 'btoa';
import faker from 'Faker';
import titlegen from 'titlegen';
import config from '../config';
import Contact from '../model/contacts.model.js';
const admin = require('../config/config').admin;
const expect = chai.expect;

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnection());

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
  const generator = titlegen.create();
  generator.feed([
    'My Love',
    'Soulmate',
    'My Boss',
    'My Partner',
    'My Teacher',
    'My Mentor',
    'My Big Brother',
    'My Mom',
    'My Dad',
  ]);
  var contactTitle = generator.next();
  var contact = {
    name: faker.Name.findName(),
    title: contactTitle,
    email: faker.Internet.email(),
    phone: faker.PhoneNumber.phoneNumber(),
    address: faker.Address.streetAddress(),
    company: faker.Company.companyName(),
  };

  describe("GET '/'", function () {
    it('should get status code 200 with no auth', function (done) {
      request(url)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  describe("GET '/api'", function () {
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

    describe("GET '/api/contacts'", function () {
      it('should get status 200 if Authorized and return Array-JSON', function (done) {
        request(api)
          .get('/')
          .set(config.authorization)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.instanceof(Array);
            done();
          });
      });
    });

    describe("GET '/api/contacts/:id'", function () {
      it('should get status 200 if Authorized and return Object-json', function (done) {
        let newContact = new Contact(contact);
        var promise = newContact.save();
        promise.then(contact => {
          if (contact) {
            request(api)
              .get('/' + contact.id)
              .set(config.authorization)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('phone');
                expect(res.body).to.have.property('address');
                expect(res.body).to.have.property('company');
                expect(res.body).to.have.property('_id').to.equal(contact.id);
                done();
              });
          }
        })
        .catch(err => {
          done(err);
        });
      });
    });

  });

  describe("POST '/api/contacts'", function () {
    it('should post and get response status 200', function (done) {
      request(api)
        .post('/')
        .set(config.authorization)
        .send(contact)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe("PUT '/api/contacts/:id'", function () {
    it('should get status 200 if Authorized', function (done) {
      let newContact = new Contact(contact);
      var promise = newContact.save();
      promise.then(contact => {
        if (contact) {
          contact.name = 'Naruto';
          request(api)
            .put('/' + contact.id)
            .set(config.authorization)
            .send(contact)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('name').to.equal('Naruto');
              expect(res.body).to.have.property('title');
              expect(res.body).to.have.property('email');
              expect(res.body).to.have.property('phone');
              expect(res.body).to.have.property('address');
              expect(res.body).to.have.property('company');
              expect(res.body).to.have.property('_id').to.equal(contact.id);
              done();
            });
        }
      })
      .catch(err => {
        done(err);
      });
    });
  });

  describe("PATCH '/api/contacts/:id'", function () {
    it('should get status 200 if Authorized', function (done) {
      let newContact = new Contact(contact);
      var promise = newContact.save();
      promise.then(contact => {
        if (contact) {
          contact.name = 'Doraemon';
          contact.title = 'Anime';
          request(api)
            .patch('/' + contact.id)
            .set(config.authorization)
            .send(contact)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('name').to.equal('Doraemon');
              expect(res.body).to.have.property('title').to.equal('Anime');
              expect(res.body).to.have.property('email');
              expect(res.body).to.have.property('phone');
              expect(res.body).to.have.property('address');
              expect(res.body).to.have.property('company');
              expect(res.body).to.have.property('_id').to.equal(contact.id);
              done();
            });
        }
      })
      .catch(err => {
        done(err);
      });
    });
  });

  describe("DELETE '/api/contacts/:id'", function () {
    it('should get status 200 if Authorized', function (done) {
      let newContact = new Contact(contact);
      var promise = newContact.save();
      promise.then(contact => {
        if (contact) {
          request(api)
            .delete('/' + contact.id)
            .set(config.authorization)
            .expect(200, done);
        }
      })
      .catch(err => {
        done(err);
      });
    });
  });
});
