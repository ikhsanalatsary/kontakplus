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
  const gentype = titlegen.create();
  gentype.feed([
    'Mobile',
    'Work',
    'Home',
    'Main',
    'Work Fax',
    'Home Fax',
    'Pager',
    'Other',
  ]);
  var contactTitle = generator.next();
  var option = gentype.next();
  var contact = {
    name: faker.Name.findName(),
    title: contactTitle,
    email: [{ email: faker.Internet.email() }, { email: faker.Internet.email() }],
    phone: [
      { option, number: faker.PhoneNumber.phoneNumber() },
      { option, number: faker.PhoneNumber.phoneNumber() },
    ],
    address: [
      { address: faker.Address.streetAddress() },
      { address: faker.Address.streetAddress() },
    ],
    company: faker.Company.companyName(),
  };

  describe("GET '/'", function () {
    it('should get status code 200 with no auth', function (done) {
      request(url)
        .get('/')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
        .expect(200, done);
    });
  });

  describe("GET '/api' that not actually route", function () {
    it('should get status 404', function (done) {
      request(url)
        .get('/api')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(404, done);
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
          var newNumber = { option, number: '354345784532232' };
          var newEmail = { email: faker.Internet.email() };
          var newAddress = { address: faker.Address.streetAddress() };
          contact.phone.push(newNumber);
          contact.email.push(newEmail);
          contact.address.push(newAddress);
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
          var newNumber = { option, number: '354345784532232' };
          var newEmail = { email: faker.Internet.email() };
          var newAddress = { address: faker.Address.streetAddress() };
          contact.phone.push(newNumber);
          contact.email.push(newEmail);
          contact.address.push(newAddress);
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
