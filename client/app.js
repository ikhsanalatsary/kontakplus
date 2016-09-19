import 'angular-material/angular-material.min.css';
import './style.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMessage from 'angular-messages';
import angularMaterial from 'angular-material';
import checklistModel from 'checklist-model';
import routing from './js/routes.js';
import ContactServices from './js/services.js';
import ContactsCtrl from './js/controller.js';
import ScrollDirective from './js/directives.js';

const injection = [uirouter, angularMaterial, ngMessage, checklistModel];

angular.module('myApp', injection)
  .config(routing)
  .controller('ContactsCtrl', ContactsCtrl)
  .service('ContactServices', ContactServices)
  .directive('scroll', ScrollDirective);
