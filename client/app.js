import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './js/routes.js';
import { ContactsCtrl } from './js/controller.js';

angular.module('myApp', [uirouter])
  .config(routing)
  .controller('ContactsCtrl', ContactsCtrl);
