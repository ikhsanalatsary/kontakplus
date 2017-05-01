export default class ContactsCtrl {
  constructor($rootScope, $stateParams, $state, ContactServices, person, $mdToast, $log, $mdDialog) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.ContactServices = ContactServices;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.newRecord = true;
    this.position = 'top';
    if (angular.isDefined($stateParams._id)) {
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
      browseIconCls: 'myBrowse',
      captionIconCls: 'myCaption',
    };

    this.getContacts = () => {
      this.ContactServices.find()
        .then((res) => {
          this.contacts = res.data;
        }, handleError.bind(this));
    };

    this.getConFav = () => {
      this.ContactServices.findFav()
        .then((res) => {
          this.confav = res.data;
        }, (res) => {
          if (res.status === 404) {
            this.$log.log('You have no favorite contact');
          } else {
            this.$log.log(res);
          }
        });
    };

    // Always on top when state change
    $rootScope.$on('$stateChangeSuccess', () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });

    this.getContacts();
    this.getConFav();
  }

  // Remove Method by {_id}
  removeContact(contactId) {
    const confirm = this.$mdDialog.confirm()
      .title('Are you sure to delete this records ?')
      .ariaLabel('Confirmation')
      .ok('Delete')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(() => {
      this.ContactServices.delete(contactId)
        .then(() => {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Successfully deleted')
              .position(this.position)
              .hideDelay(3000)
            );
          this.$state.reload();
        }, handleError.bind(this));
    });
  }

  // Go to form Create
  newContact() {
    this.$state.go('contacts.add');
  }

  // Submit Contact method
  addContact() {
    const { ContactServices, $state, contact, files, $mdToast, position } = this;
    if (!angular.isDefined(contact.name)) return;
    ContactServices.insert(contact, files)
      .then(() => {
        $state.go('contacts.list');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Successfully created')
            .position(position)
            .hideDelay(3000)
          );

        this.$state.reload();
      }, handleError.bind(this));
  }

  // Update Contact method
  updateContact() {
    const { ContactServices, $state, person, files, $mdToast, position } = this;
    ContactServices.update(person, files)
      .then(() => {
        $state.go('contacts.list');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Successfully updated')
            .position(position)
            .hideDelay(3000)
          );
        this.$state.reload();
      }, handleError.bind(this));
  }

  // Set favorite method
  addFavorite(val) {
    const { ContactServices, $stateParams, $mdToast, position } = this;
    this.contact.favorite = val;
    ContactServices.patch($stateParams._id, this.contact)
      .then(() => {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Success changed')
            .position(position)
            .hideDelay(3000)
          );
        this.$state.reload();
      }, handleError.bind(this));
  }

  // Add field phone
  addNewPhone() {
    if (this.newRecord) {
      this.contact.phone.push({ option: 'Mobile' });
    } else {
      this.person.phone.push({ option: 'Mobile' });
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
      this.contact.email.push({ option: 'Personal' });
    } else {
      this.person.email.push({ option: 'Personal' });
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
      this.contact.address.push({ option: 'Home' });
    } else {
      this.person.address.push({ option: 'Home' });
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
    const arr = this.superhero;
    const $mdToast = this.$mdToast;
    if (arr.length > 1) {
      const confirm = this.$mdDialog.confirm()
        .title('Are you sure to delete this records ?')
        .ariaLabel('Confirmation')
        .ok('Delete')
        .cancel('Cancel');

      this.$mdDialog.show(confirm).then(() => {
        arr.forEach((contactId) => {
          this.ContactServices.delete(contactId)
            .then((res) => {
              if (res.status === 200) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Successfully deleted')
                    .position(this.position)
                    .hideDelay(1000)
                  );
                this.$state.reload();
              }
            })
            .finally(() => (this.superhero = []));
        });
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
  '$log',
  '$mdDialog',
];

function handleError(res) {
  const $mdToast = this.$mdToast;
  if (res.status !== -1) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(`${res.status} status ${res.statusText}`)
        .position(this.position)
        .hideDelay(1000)
        .theme('error-toast')
      );
  } else {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Connection lost')
        .position(this.position)
        .hideDelay(1000)
        .theme('error-toast')
      );
  }
}
