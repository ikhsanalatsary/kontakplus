function routes($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider) {
  /* eslint-disable global-require */
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');

  // Enable browser color
  $mdThemingProvider.enableBrowserColor({
    theme: 'default',
    palette: 'primary',
  });

  $stateProvider
    .state({
      name: 'contacts',
      abstract: true,
      url: '/contacts',
      template: '<ui-view/>',
      controller: 'ContactsCtrl',
      controllerAs: '$this',
      resolve: {
        person() {},
      },
    })
    .state({
      name: 'contacts.list',
      url: '/list',
      template: require('../contacts.list.html'),
      data: {
        isList: true,
      },
    })
    .state({
      name: 'contacts.detail',
      url: '/:_id',
      template: require('../contacts.detail.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contact',
      resolve: { person },
      data: {
        isList: false,
      },
    })
    .state({
      name: 'contacts.add',
      url: '/new/contact',
      template: require('../form.contacts.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'vm',
      data: {
        isList: false,
      },
    })
    .state({
      name: 'contacts.edit',
      url: '/edit/:_id',
      template: require('../form.contacts.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'vm',
      resolve: { person },
      data: {
        isList: false,
      },
    });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.when('', 'contacts/list');
  $urlRouterProvider.when('/', 'contacts/list');
  $urlRouterProvider.otherwise('/contacts/list');
}

routes.$inject = [
  '$stateProvider',
  '$locationProvider',
  '$urlRouterProvider',
  '$mdThemingProvider',
];

function person(ContactServices, $stateParams) {
  return ContactServices.findOne($stateParams._id);
}

person.$inject = ['ContactServices', '$stateParams'];

export default routes;
