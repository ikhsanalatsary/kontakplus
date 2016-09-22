import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

export default class ContactsCtrl {
  constructor($rootScope, $stateParams, $state, ContactServices, person, $mdToast) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.ContactServices = ContactServices;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.newRecord = true;
    if (typeof $stateParams._id !== 'undefined') {
      this.newRecord = false;
      this.person = person.data;
    }

    this.value = false;
    this.search = false;
    this.superhero = [];
    this.contact = {};
    this.contact.phone = [{ option: 'Mobile' }];
    this.contact.email = [{ option: 'Personal' }];
    this.contact.address = [{ option: 'Home' }];
    this.option = {
      "browseIconCls": "myBrowse",
      "captionIconCls": "myCaption",
    };

    this.getContacts = () => {
      this.ContactServices.find()
        .then(res => {
          this.contacts = res.data;
        }, handleError);
    };

    this.getConFav = () => {
      this.ContactServices.findFav()
        .then(res => {
          this.confav = res.data;
        }, (res) => {
          if (res.status == 404) {
            console.log('You have no favorite contact');
          } else {
            console.log(res);
          }

        });
    };

    this.$rootScope.$on('findContacts', () => {
      this.getContacts();
      this.getConFav();
    });

    // this.getContacts();
    // this.getConFav();
    this.$rootScope.$emit('findContacts', {});
  }

  // Remove Method by {_id}
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
                this.$rootScope.$emit('findContacts', {});
              }
            }, handleError);
        } else {
          swal('Cancelled', 'Your contact is safe :)', 'error');
          return;
        }
      });
  }

  // Go to form Create
  newContact() {
    this.$state.go('contacts.add');
  }

  // Submit Contact method
  addContact() {
    var { ContactServices, $state, contact, files, $mdToast } = this;
    if (typeof contact.name === 'undefined') return;
    ContactServices.insert(contact, files)
      .then(res => {
        // console.log(res.data);
        $state.go('contacts.list');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Successfully created')
            .position('top left')
            .hideDelay(3000)
          );

        this.$rootScope.$emit('findContacts', {});
      }, handleError);
  }

  // Update Contact method
  updateContact() {
    var { ContactServices, $state, person, files, $mdToast } = this;
    ContactServices.update(person, files)
      .then(res => {
        // console.log(res.data);
        $state.go('contacts.list');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Successfully updated')
            .position('top right')
            .hideDelay(3000)
          );
        this.$rootScope.$emit('findContacts', {});
      }, handleError);
  }

  // Set favorite method
  addFavorite(val) {
    var { ContactServices, $stateParams, $mdToast } = this;
    this.contact.favorite = val;
    ContactServices.patch($stateParams._id, this.contact)
      .then(res => {
        // console.log(res);
        $mdToast.show(
          $mdToast.simple()
            .textContent('Success changed')
            .position('top left')
            .hideDelay(3000)
          );
        this.$rootScope.$emit('findContacts', {});
      }, handleError);
  }

  // Add field phone
  addNewPhone() {
    if (this.newRecord) {
      this.contact.phone.push({ 'option': 'Mobile' });
    } else {
      this.person.phone.push({ 'option': 'Mobile' });
    }

  }

  // Remove field phone
  removePhone(item) {
    if (this.newRecord) {
      this.contact.phone.splice(item, 1);
    } else {
      this.person.phone.splice(item, 1);
    }

  }

  // Add field email
  addNewEmail() {
    if (this.newRecord) {
      this.contact.email.push({ 'option': 'Personal' });
    } else {
      this.person.email.push({ 'option': 'Personal' });
    }

  }

  // Remove field email
  removeEmail(item) {
    if (this.newRecord) {
      this.contact.email.splice(item, 1);
    } else {
      this.person.email.splice(item, 1);
    }

  }

  // Add field address
  addNewAddress() {
    if (this.newRecord) {
      this.contact.address.push({ 'option': 'Home' });
    } else {
      this.person.address.push({ 'option': 'Home' });
    }

  }

  // Remove field address
  removeAddress(item) {
    if (this.newRecord) {
      this.contact.address.splice(item, 1);
    } else {
      this.person.address.splice(item, 1);
    }

  }

  // Checlist box All contact
  checkAll(checked) {
    if (checked) {
      this.superhero = this.contacts.map((item) => item._id);
    } else {
      this.uncheckAll();
    }
  }

  // Uncheck all contact
  uncheckAll() {
    this.superhero = [];
  }

  // Remove / delete selected contact
  deleteAll() {
    var arr = this.superhero;
    var $mdToast = this.$mdToast;
    if (arr.length > 1) {
      return arr.forEach(contactId => {
        this.ContactServices.delete(contactId)
          .then(res => {
            if (res.status == 200) {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Successfully deleted')
                  .position('top left')
                  .hideDelay(3000)
                );
              this.$rootScope.$emit('findContacts', {});
            }
          }, handleError)
          .finally(() => this.superhero = []);
      });
    }
  }

  // Search button
  searchBtn() {
    this.search = true;
  }

  // Disable search
  removeSearch() {
    this.search = false;
    this.searchContact = '';
  }

  // Go to Detail page by {_id}
  goDetail(_id) {
    this.$state.go('contacts.detail', { _id });
  }

  // Back to list contact
  goBack() {
    this.$state.go('contacts.list');
  }
}

ContactsCtrl.$inject = [
  '$rootScope',
  '$stateParams',
  '$state',
  'ContactServices',
  'person',
  '$mdToast',
];

function handleError(res) {
  if (res.status !== -1) {
    swal('Error ', res.status + ' status ' + res.statusText, 'error');
  } else {
    swal('Error ', 'Connection lost', 'error');
  }

}
