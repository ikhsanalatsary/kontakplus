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

    this.value = false;
    this.search = false;
    this.superhero = [];
    this.contact = {};
    this.phone = [{ option: 'Mobile' }];
    this.email = [{ option: 'Personal' }];
    this.address = [{ option: 'Home' }];

    this.getContacts = () => {
      this.ContactServices.find()
        .then(res => {
          this.contacts = res.data;
        }, handleError);
    };

    this.$rootScope.$on('findContacts', () => {
      this.getContacts();
    });

    this.getContacts();
  }

  removeContact(contactId) {
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
          this.ContactServices.delete(contactId)
            .then(res => {
              if (res.status == 200) {
                this.getContacts();
              }
            }, handleError);
        } else {
          swal('Cancelled', 'Your contact is safe :)', 'error');
          return;
        }
      });
  }

  newContact() {
    this.$state.go('contacts.add');
  }

  addContact() {
    var { ContactServices, $state, contact, email, phone, address } = this;
    console.log(contact);
    if (typeof contact.name === 'undefined') return;
    var person = angular.extend({}, contact, { email }, { phone }, { address });
    ContactServices.insert(person)
      .then(res => {
        console.log(res.data);
        $state.go('contacts.list');
        this.$rootScope.$emit('findContacts', {});
      }, handleError);
  }

  updateContact() {
    var { ContactServices, $state, person } = this;
    ContactServices.update(person)
      .then(res => {
        console.log(res.data);
        $state.go('contacts.list');
        this.$rootScope.$emit('findContacts', {});
      }, handleError);
  }

  addNewPhone() {
    if (this.newRecord) {
      console.log('hey');
      this.phone.push({ 'option': 'Mobile' });
    } else {
      this.person.phone.push({ 'option': 'Mobile' });
    }

  }

  removePhone(item) {
    if (this.newRecord) {
      this.phone.splice(item, 1);
    } else {
      this.person.phone.splice(item, 1);
    }

  }

  addNewEmail() {
    if (this.newRecord) {
      this.email.push({ 'option': 'Personal' });
    } else {
      this.person.email.push({ 'option': 'Personal' });
    }

  }

  removeEmail(item) {
    if (this.newRecord) {
      this.email.splice(item, 1);
    } else {
      this.person.email.splice(item, 1);
    }

  }

  addNewAddress() {
    if (this.newRecord) {
      this.address.push({ 'option': 'Home' });
    } else {
      this.person.address.push({ 'option': 'Home' });
    }

  }

  removeAddress(item) {
    if (this.newRecord) {
      this.address.splice(item, 1);
    } else {
      this.person.address.splice(item, 1);
    }

  }

  checkAll(checked) {
    if (checked) {
      this.superhero = this.contacts.map((item) => item._id);
    } else {
      this.uncheckAll();
    }
  }

  uncheckAll() {
    this.superhero = [];
  }

  deleteAll() {
    var arr = this.superhero;
    if (arr.length > 1) {
      return arr.forEach(contactId => {
        this.ContactServices.delete(contactId)
          .then(res => {
            if (res.status == 200) {
              this.getContacts();
            }
          }, handleError)
          .finally(() => this.superhero = []);
      });
    }
  }

  searchBtn() {
    this.search = true;
  }

  removeSearch() {
    this.search = false;
    this.searchContact = '';
  }

  goDetail(_id) {
    this.$state.go('contacts.detail', { _id });
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
  if (res.status !== -1) {
    swal('Error ', res.status + ' status ' + res.statusText, 'error');
  } else {
    swal('Error ', 'Connection lost', 'error');
  }

}
