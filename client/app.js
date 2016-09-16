import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import './style.css';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMessage from 'angular-messages';
import checklistModel from 'checklist-model';
import routing from './js/routes.js';
import ContactServices from './js/services.js';
import ContactsCtrl from './js/controller.js';

angular.module('myApp', [uirouter, ngMessage, checklistModel])
  .config(routing)
  .controller('ContactsCtrl', ContactsCtrl)
  .service('ContactServices', ContactServices);

$.material.init();
