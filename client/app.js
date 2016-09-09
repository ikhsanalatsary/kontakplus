import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './js/routes.js';
import { ContactsCtrl, ContactsDetailCtrl, AddContactsCtrl } from './js/controller.js';

angular.module('myApp', [uirouter])
  .config(routing)
  .controller('ContactsCtrl', ContactsCtrl)
  .controller('AddContactsCtrl', AddContactsCtrl)
  .controller('ContactsDetailCtrl', ContactsDetailCtrl);
