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
      template: require('../form.contacts.html'),
      controller: 'FormContactsCtrl',
      controllerAs: 'contactModel',
      resolve: {
        contact() {
        },
      },
    })
    .state({
      name: 'contacts.edit',
      url: '/edit/:_id',
      template: require('../form.contacts.html'),
      controller: 'FormContactsCtrl',
      controllerAs: 'contactModel',
      resolve: {
        contact($http, $stateParams) {
          const Base64Str = btoa(`${admin.user}:${admin.password}`);
          const headers = { "Authorization": "Basic " + Base64Str };
          return $http.get('api/contacts/' + $stateParams._id, { headers });
        },
      },
    });
  $urlRouterProvider.when('', 'contacts/list');
  $urlRouterProvider.when('/', 'contacts/list');
  $urlRouterProvider.otherwise('/contacts/list');
};

routes.$inject = ['$stateProvider', '$urlRouterProvider'];
