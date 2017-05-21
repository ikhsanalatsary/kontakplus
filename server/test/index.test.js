import mongoose from 'mongoose';
import { expect } from 'chai';
import request from 'supertest';
import btoa from 'btoa';
import faker from 'Faker';
import titlegen from 'titlegen';
import config from '../config';
import Contact from '../model/contacts.model';
import { admin } from '../config/config.json';

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnection());

describe('Routing', () => {
  const base64Str = btoa(`${admin.user}:${admin.password}`);
  const url = 'http://localhost:3000';
  const api = 'http://localhost:3000/api/contacts';
  const headers = {
    authorization: {
      Authorization: `Basic ${base64Str}`,
      Accept: 'application/json',
    },
    unauthorization: {
      'WWW-Authenticate': 'Basic realm=Authorization Required',
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
  ]);

  const etype = titlegen.create();
  etype.feed([
    'Personal',
    'Work',
    'Other',
  ]);

  const adrtype = titlegen.create();
  adrtype.feed([
    'Home',
    'Work',
    'Other',
  ]);

  const contactTitle = generator.next();
  const option = gentype.next();
  const option2 = etype.next();
  const option3 = adrtype.next();
  const contact = {
    name: faker.Name.findName(),
    title: contactTitle,
    email: [
      { option: option2, email: faker.Internet.email() },
      { option: option2, email: faker.Internet.email() },
    ],
    phone: [
      { option, number: faker.PhoneNumber.phoneNumber() },
      { option, number: faker.PhoneNumber.phoneNumber() },
    ],
    address: [
      { option: option3, address: faker.Address.streetAddress() },
      { option: option3, address: faker.Address.streetAddress() },
    ],
    company: faker.Company.companyName(),
    favorite: false,
  };

  describe("GET '/'", () => {
    it('should get status code 200 with no auth', (done) => {
      request(url)
        .get('/')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
        .expect(200, done);
    });
  });

  describe("GET '/api' that not actually route", () => {
    it('should get status 404', (done) => {
      request(url)
        .get('/api')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(404, done);
    });

    describe("GET '/api/contacts'", () => {
      it('should get status 200 if Authorized and return Array-JSON', (done) => {
        request(api)
          .get('/')
          .set(headers.authorization)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.be.instanceof(Array);
            done();
          });
      });
    });

    describe("GET '/api/contacts/:id'", () => {
      it('should get status 200 if Authorized and return Object-json', (done) => {
        const newContact = new Contact(contact);
        const promise = newContact.save();
        promise.then((person) => {
          if (person) {
            request(api)
              .get(`/${person.id}`)
              .set(headers.authorization)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('phone');
                expect(res.body).to.have.property('address');
                expect(res.body).to.have.property('company');
                expect(res.body).to.have.property('_id').to.equal(person.id);
                done();
              });
          }
        })
        .catch((err) => {
          done(err);
        });
      });
    });
  });

  describe("POST '/api/contacts'", () => {
    it('should post and get response status 200', (done) => {
      request(api)
        .post('/')
        .set(headers.authorization)
        .send(contact)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    describe('upload image', () => {
      it('should get status 200 response', (done) => {
        request(api)
          .post('/upload')
          .set(headers.authorization)
          .attach('avatar', '/Users/adi/Desktop/nodejs-512.png')
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe("PUT '/api/contacts/:id'", () => {
    it('should get status 200 if Authorized', (done) => {
      const newContact = new Contact(contact);
      const promise = newContact.save();
      promise.then((person) => {
        if (person) {
          const body = {};
          body.name = 'Jhonny Depp put';
          body.company = 'Hollywood';
          body.title = 'Actress';
          const newPerson = Object.assign(person, body);
          request(api)
            .put(`/${person.id}`)
            .set(headers.authorization)
            .send(newPerson)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('name').to.equal('Jhonny Depp put');
              expect(res.body).to.have.property('title');
              expect(res.body).to.have.property('email');
              expect(res.body).to.have.property('phone');
              expect(res.body).to.have.property('address');
              expect(res.body).to.have.property('company');
              expect(res.body).to.have.property('_id').to.equal(person.id);
              done();
            });
        }
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe("PATCH '/api/contacts/:id'", () => {
    it('should get status 200 if Authorized', (done) => {
      const newContact = new Contact(contact);
      const promise = newContact.save();
      promise.then((person) => {
        if (person) {
          const body = {};
          body.favorite = true;
          body.name = 'patch';
          const newPerson = Object.assign(person, body);
          request(api)
            .patch(`/${person.id}`)
            .set(headers.authorization)
            .send(newPerson)
            .expect(200)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('name').to.equal('patch');
              expect(res.body).to.have.property('favorite').to.equal(true);
              done();
            });
        }
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe("DELETE '/api/contacts/:id'", () => {
    it('should get status 200 if Authorized', (done) => {
      const newContact = new Contact(contact);
      const promise = newContact.save();
      promise.then((person) => {
        if (person) {
          request(api)
            .delete(`/${person.id}`)
            .set(headers.authorization)
            .expect(200, done);
        }
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
