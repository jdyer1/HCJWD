(function() {
    'use strict';

    angular.module('MenuApp').config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '../templates/home.template.html'

        }).state('categories', {
            url: '/categories',
            templateUrl: '../templates/categories.template.html',
            controller: 'CategoriesController as cat',
            resolve: {
                categories: ['MenuDataService', function(menuDataService) {
                    return menuDataService.getAllCategories();
                }]
            }
        }).state('items', {
            url: '/items/{sn}',
            params: {
                sn: null
            },
            templateUrl: '../templates/items.template.html',
            controller: 'ItemsController as itemc',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, menuDataService) {
                    return menuDataService.getItemsForCategory($stateParams.sn);
                }]
            }
        });
    }
})();
