const admin = require('../basic').admin;
const Base64Str = btoa(`${admin.user}:${admin.password}`);
const headers = { "Authorization": "Basic " + Base64Str };

export class ContactsCtrl {
  constructor($http, $state, $rootScope) {
    this.$http = $http;
    this.$state = $state;
    this.getContacts = () => {
      this.$http.get('/api/contacts', { headers })
        .then(res => {
          this.contacts = res.data;
        }, handleError);
    };

    $rootScope.$on("callgetContacts", () => {
      this.getContacts();
    });

    this.getContacts();
  }

  removeContact(contact) {
    this.$http.delete('/api/contacts/' + contact._id, { headers })
      .then(res => {
        if (res.status == 200) {
          this.getContacts();
        }
      }, handleError);
  }

  newContact() {
    this.$state.go('contacts.add');
  }
}

ContactsCtrl.$inject = ['$http', '$state', '$rootScope'];

export class ContactsDetailCtrl {
  constructor($http, $stateParams) {
    $http.get('/api/contacts/' + $stateParams._id, { headers })
      .then(res => {
        this.person = res.data;
      }, handleError);
  }
}

ContactsDetailCtrl.$inject = ['$http', '$stateParams'];

export class AddContactsCtrl {
  constructor($http, $state, $rootScope) {
    this.$http = $http;
    this.$state = $state;
    this.callContacts = function () {
      $rootScope.$emit("callgetContacts", {});
    };
  }

  addContact(contact) {
    var { $http, $state } = this;
    $http.post('/api/contacts/', contact, { headers })
      .then(res => {
        console.log(res.data);
        $state.go('contacts.list');
        this.callContacts();
      }, handleError);
  }

  reset(contact) {
    this.reset = {};
    angular.copy(this.reset, contact);
  }

  goBack() {
    this.$state.go('contacts.list');
  }
}

AddContactsCtrl.$inject = ['$http', '$state', '$rootScope'];

function handleError(res) {
  // swal('Error ', res.status + ' status ' + res.statusText, 'error');
  alert(res.status + res.statusText);
}
