/* eslint-disable no-param-reassign */
import Contact from '../model/contacts.model';

exports.create = (req, res) => {
  const body = req.body;
  if (req.file) body.avatar = req.file.filename;

  let bodyTitle;
  let bodyCompany;
  const bodyName = JSON.parse(body.name);
  const bodyEmail = JSON.parse(body.email);
  const bodyPhone = JSON.parse(body.phone);
  const bodyAddress = JSON.parse(body.address);
  if (typeof body.title !== 'undefined') bodyTitle = JSON.parse(body.title);
  if (typeof body.company !== 'undefined') bodyCompany = JSON.parse(body.company);

  const { avatar } = body;
  const person = {
    name: bodyName,
    title: bodyTitle,
    email: bodyEmail,
    phone: bodyPhone,
    address: bodyAddress,
    company: bodyCompany,
    avatar,
  };

  const contact = new Contact(person);

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
    if (req.file) {
      contact.avatar = req.file.filename;
    }

    contact.name = JSON.parse(body.name);
    contact.email = JSON.parse(body.email);
    contact.phone = JSON.parse(body.phone);
    contact.address = JSON.parse(body.address);
    let bodyTitle;
    let bodyCompany;
    if (typeof body.title !== 'undefined') bodyTitle = JSON.parse(body.title);
    if (typeof body.company !== 'undefined') bodyCompany = JSON.parse(body.company);

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
