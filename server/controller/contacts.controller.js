'use strict';

import mongoose from 'mongoose';
import Contact from '../model/contacts.model.js';

exports.create = (req, res, next) => {
  const body = req.body;
  var { name, title, email, phone, address, company, } = body;
  var contact = new Contact({
    name,
    title,
    email,
    phone,
    address,
    company,
  });

  contact.save(err => {
    if (err) return handleError(res, err);
    return res.sendStatus(200);
  });

};

exports.show = (req, res, next) => {
  var contactId = req.params.id;
  Contact.findById(contactId, function (err, contact) {
    if (err) return res.status(400).json(err);
    res.status(200).json(contact);
  });
};

exports.index = (req, res, next) => {
  Contact.find({}, null, { sort: { created: -1 } }, function (err, contacts) {
    if (err) return res.sendStatus(404);
    if (contacts.length == 0) return res.sendStatus(404);
    return res.status(200).json(contacts);
  });
};

exports.update = (req, res, next) => {
  Contact.findById(req.params.id, function (err, contact) {
    contact.name = String(req.body.name);
    contact.title = String(req.body.title);
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.address = req.body.address;
    contact.company = String(req.body.company);

    contact.save((err, result) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(result);
    });
  });
};

exports.delete = (req, res, next) => {
  Contact.remove({ _id: req.params.id }, function (err) {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
