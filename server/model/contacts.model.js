'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  title: String,
  email: { type: String, lowercase: true },
  phone: String,
  address: String,
  company: String,
  created: { type: Date, default: Date.now },
  updated: Date,
});

contactSchema
  .pre('save', function (next) {
    if (this.isNew) return next();
    this.updated = Date.now();
    return next();
  });

const Contacts = mongoose.model('Contacts', contactSchema);

module.exports = Contacts;
