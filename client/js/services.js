const admin = require('../basic').admin;
const Base64Str = btoa(`${admin.user}:${admin.password}`);
const headers = { 'Authorization': 'Basic ' + Base64Str };

export default class ContactServices {
  constructor($http) {
    this.$http = $http;
    this.api = '/api/contacts/';
  }

  // GET method
  find() {
    var data = {
       name: 'Katy Perry',
    };
    return this.$http.get(this.api, { headers });
  }

  findFav() {
    var data = {
       favorite: true,
    };
    return this.$http.get(this.api, { params: data, headers });
  }

  // DELETE method
  delete(contactId) {
    return this.$http.delete(this.api + contactId, { headers });
  }

  // POST method
  insert(data, files) {
    let headers = {
      'Authorization': 'Basic ' + Base64Str,
      'Content-Type': undefined,
    };
    var fd = new FormData();
    if (angular.isDefined(files)) {
      angular.forEach(files, (obj) => {
        fd.append('avatar', obj.lfFile);
      });
    }

    for (let key in data) {
      // Angular.toJson lebih ketat dibanding JsonStringify,
      // hapus key '$$hashKey', pada object value Array
      fd.append(key, angular.toJson(data[key]));
    }

    return this.$http.post(this.api, fd, { transformRequest: angular.identity, headers });
  }

  // PUT method
  update(contact, files) {
    let headers = {
      'Authorization': 'Basic ' + Base64Str,
      'Content-Type': undefined,
    };
    var fd = new FormData();
    if (angular.isDefined(files)) {
      angular.forEach(files, (obj) => {
        fd.append('avatar', obj.lfFile);
      });
    }

    for (let key in contact) {
      fd.append(key, angular.toJson(contact[key]));
    }

    return this.$http.put(this.api + contact._id, fd, {
      transformRequest: angular.identity,
      headers,
    });
  }

  // Show by {_id} method
  findOne(contactId) {
    return this.$http.get(this.api + contactId, { headers });
  }

  // Set Favorite method
  patch(contactId, data) {
    return this.$http.patch(this.api + contactId, data, { headers });
  }
}

ContactServices.$inject = ['$http'];
