export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'contacts',
      abstract: true,
      url: '/contacts',
      template: require('../contacts.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contacts',
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
      controller: 'ContactsDetailCtrl',
      controllerAs: 'contact',
    })
    .state({
      name: 'contacts.add',
      url: '/new/contact',
      template: require('../add.contacts.html'),
      controller: 'AddContactsCtrl',
      controllerAs: 'contactModel',
    });
  $urlRouterProvider.when('', 'contacts/list');
  $urlRouterProvider.when('/', 'contacts/list');
  $urlRouterProvider.otherwise('/contacts/list');
};

routes.$inject = ['$stateProvider', '$urlRouterProvider'];
