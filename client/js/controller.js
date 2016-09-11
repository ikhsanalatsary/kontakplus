import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

export default class ContactsCtrl {
  constructor($rootScope, $stateParams, $state, ContactServices, person) {
    this.$rootScope = $rootScope;
    this.ContactServices = ContactServices;
    this.$state = $state;
    this.newRecord = true;
    if (typeof $stateParams._id !== 'undefined') {
      this.newRecord = false;
      this.person = person.data;
    }

    this.getContacts = () => {
      this.ContactServices.find()
        .then(res => {
          this.contacts = res.data;
        }, handleError)
        .catch(err => console.log(err));
    };

    this.$rootScope.$on('findContacts', () => {
      this.getContacts();
    });

    this.getContacts();
  }

  removeContact(contact) {
    swal({
        title: 'Are you sure?',
        text: 'You will delete this contact!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
        closeOnConfirm: true,
        closeOnCancel: false,
    },
      (isConfirm) => {
        if (isConfirm) {
          this.ContactServices.delete(contact._id)
            .then(res => {
              if (res.status == 200) {
                this.getContacts();
              }
            }, handleError)
            .catch(err => console.log(err));
        } else {
          swal('Cancelled', 'Your contact is safe :)', 'error');
          return;
        }
      });
  }

  newContact() {
    this.$state.go('contacts.add');
  }

  addContact(contact) {
    var { ContactServices, $state } = this;
    ContactServices.insert(contact)
      .then(res => {
        console.log(res.data);
        $state.go('contacts.list');
        this.$rootScope.$emit('findContacts', {});
      }, handleError)
      .catch(err => console.log(err));
  }

  updateContact(contact) {
    var { ContactServices, $state } = this;
    ContactServices.update(contact)
      .then(res => {
        console.log(res.data);
        $state.go('contacts.list');
      }, handleError)
      .catch(err => console.log(err));
  }

  reset(contact) {
    this.reset = {};
    angular.copy(this.reset, contact);
  }

  goBack() {
    this.$state.go('contacts.list');
  }
}

ContactsCtrl.$inject = ['$rootScope', '$stateParams', '$state', 'ContactServices', 'person'];

function handleError(res) {
  swal('Error ', res.status + ' status ' + res.statusText, 'error');
}
