const admin = require('../basic').admin;
const Base64Str = btoa(`${admin.user}:${admin.password}`);
const headers = { 'Authorization': 'Basic ' + Base64Str };

export default class ContactServices {
  constructor($http) {
    this.$http = $http;
    this.api = '/api/contacts/';
  }

  find() {
    return this.$http.get(this.api, { headers });
  }

  delete(contactId) {
    return this.$http.delete(this.api + contactId, { headers });
  }

  insert(contact) {
    return this.$http.post(this.api, contact, { headers });
  }

  update(contact) {
    return this.$http.put(this.api + contact._id, contact, { headers });
  }

  findOne(contactId) {
    return this.$http.get(this.api + contactId, { headers });
  }
}

ContactServices.$inject = ['$http'];
