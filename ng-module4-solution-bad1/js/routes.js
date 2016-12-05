(function () {
'use strict';

angular.module('MainApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home.template.html'
  }).state('categories', {
    url: '/categories',
    templateUrl: 'categories.template.html',
    controller: 'CategoriesController as cat',
    resolve: {
      items: ['MenuHttpService', function (menuHttpService) {
        return menuHttpService.getItems();
      }]
    }
  });
}

})();
