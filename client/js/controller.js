import btoa from 'btoa';
const admin = require('../basic').admin;

export class ContactsCtrl {
  constructor($http) {
    const Base64Str = btoa(`${admin.user}:${admin.password}`);

    //  $http.defaults.headers.common['Authorization'] = `Basic ${Base64Str}`;
    const headers = { "Authorization": "Basic " + Base64Str };
    $http.get('/api/contacts', { headers })
    .then(res => {
      this.contacts = res.data;
    }, handleError);

    function handleError(res) {
      // swal('Error ', res.status + ' status ' + res.statusText, 'error');
      alert(res.status + res.statusText);
    }
  }
}

ContactsCtrl.$inject = ['$http'];
