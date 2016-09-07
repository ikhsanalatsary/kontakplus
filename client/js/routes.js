export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'home',
      url: '/contacts',
      template: require('../main.html'),
      controller: 'ContactsCtrl',
      controllerAs: 'contacts',
    });
  $urlRouterProvider.otherwise('/contacts');
};

routes.$inject = ['$stateProvider', '$urlRouterProvider'];
