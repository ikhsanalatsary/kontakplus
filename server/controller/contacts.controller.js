/* eslint-disable no-param-reassign */
import Contact from '../model/contacts.model';

exports.create = (req, res) => {
  const body = req.body;
  const contact = new Contact(body);

  contact.save((err) => {
    if (err) return handleError(res, err);
    return res.sendStatus(200);
  });
};

exports.show = (req, res) => {
  const contactId = req.params.id;
  Contact.findById(contactId, (err, contact) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(contact);
  });
};

exports.index = (req, res) => {
  const query = {};
  if (req.query.favorite) query.favorite = Boolean(req.query.favorite);

  Contact.find(query, null, { sort: { name: 1 } }, (err, contacts) => {
    if (err) return res.sendStatus(404);
    if (contacts.length === 0) return res.sendStatus(404);
    return res.status(200).json(contacts);
  });
};

exports.update = (req, res) => {
  const body = req.body;
  Contact.findById(req.params.id, (err, contact) => {
    contact = Object.assign(contact, body);
    contact.save((err, result) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(result);
    });
  });
};

exports.delete = (req, res) => {
  Contact.remove({ _id: req.params.id }, (err) => {
    if (err) return res.sendStatus(400);
    return res.sendStatus(200);
  });
};

exports.patch = (req, res) => {
  Contact.findById(req.params.id, (err, contact) => {
    contact.favorite = req.body.favorite;
    if (req.body.name) contact.name = req.body.name;

    contact.save((err, result) => {
      if (err) return res.json(400, err);
      return res.status(200).json(result);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}

exports.upload = (req, res) => {
  // upload here
  if (req.file) res.json({ avatar: req.file.filename });
};
