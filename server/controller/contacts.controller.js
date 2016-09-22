'use strict';

import mongoose from 'mongoose';
import Contact from '../model/contacts.model.js';

exports.create = (req, res, next) => {
  const body = req.body;
  if (req.file) body.avatar = req.file.filename;

  var bodyTitle;
  var bodyCompany;
  let bodyName = JSON.parse(body.name);
  let bodyEmail = JSON.parse(body.email);
  let bodyPhone = JSON.parse(body.phone);
  let bodyAddress = JSON.parse(body.address);
  if (typeof body.title !== 'undefined') bodyTitle = JSON.parse(body.title);
  if (typeof body.company !== 'undefined') bodyCompany = JSON.parse(body.company);

  var { avatar } = body;
  let person = {
    name: bodyName,
    title: bodyTitle,
    email: bodyEmail,
    phone: bodyPhone,
    address: bodyAddress,
    company: bodyCompany,
    avatar,
  };

  var contact = new Contact(person);

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
  let query = {};
  if (req.query.favorite) query.favorite = Boolean(req.query.favorite);

  Contact.find(query, null, { sort: { name: 1 } }, function (err, contacts) {
    if (err) return res.sendStatus(404);
    if (contacts.length == 0) return res.sendStatus(404);
    return res.status(200).json(contacts);
  });
};

exports.update = (req, res, next) => {
  let body = req.body;
  Contact.findById(req.params.id, function (err, contact) {
    if (req.file) {
      contact.avatar = req.file.filename;
    }

    var bodyTitle;
    var bodyCompany;
    contact.name = JSON.parse(body.name);
    contact.email = JSON.parse(body.email);
    contact.phone = JSON.parse(body.phone);
    contact.address = JSON.parse(body.address);
    if (typeof body.title !== 'undefined') bodyTitle = JSON.parse(body.title);
    if (typeof body.company !== 'undefined') bodyCompany = JSON.parse(body.company);

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

exports.patch = (req, res, next) => {
  Contact.findById(req.params.id, function (err, contact) {
    contact.favorite = req.body.favorite;
    contact.name = req.body.name;

    contact.save((err, result) => {
      if (err) return res.json(400, err);
      res.status(200).json(result);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
