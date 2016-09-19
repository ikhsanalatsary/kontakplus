'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true, default: '' },
  title: { type: String, default: '' },
  email: { type: Array, default: [] },
  phone: { type: Array, default: [] },
  address: { type: Array, default: [] },
  company: { type: String, default: '' },
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
