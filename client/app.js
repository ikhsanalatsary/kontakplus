import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './js/routes.js';
import { ContactsCtrl, ContactsDetailCtrl, FormContactsCtrl } from './js/controller.js';

angular.module('myApp', [uirouter])
  .config(routing)
  .controller('ContactsCtrl', ContactsCtrl)
  .controller('FormContactsCtrl', FormContactsCtrl)
  .controller('ContactsDetailCtrl', ContactsDetailCtrl);

$.material.init();
