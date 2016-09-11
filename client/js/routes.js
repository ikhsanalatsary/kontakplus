const admin = require('../basic').admin;

export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'contacts',
      abstract: true,
      url: '/contacts',
      template: require('../contacts.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contacts',
      resolve: {
        person() {},
      },
    })
    .state({
      name: 'contacts.list',
      url: '/list',
      template: require('../contacts.list.html'),
    })
    .state({
      name: 'contacts.detail',
      url: '/:_id',
      template: require('../contacts.detail.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contact',
      resolve: {
        person(ContactServices, $stateParams) {
          console.log(ContactServices);
          return ContactServices.findOne($stateParams._id);
        },
      },
    })
    .state({
      name: 'contacts.add',
      url: '/new/contact',
      template: require('../form.contacts.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contactModel',
    })
    .state({
      name: 'contacts.edit',
      url: '/edit/:_id',
      template: require('../form.contacts.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contactModel',
      resolve: {
        person(ContactServices, $stateParams) {
          console.log(ContactServices);
          return ContactServices.findOne($stateParams._id);
        },
      },
    });
  $urlRouterProvider.when('', 'contacts/list');
  $urlRouterProvider.when('/', 'contacts/list');
  $urlRouterProvider.otherwise('/contacts/list');
};

routes.$inject = ['$stateProvider', '$urlRouterProvider'];
