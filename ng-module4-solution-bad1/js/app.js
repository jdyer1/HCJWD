(function() {
    'use strict';

    angular.module("MenuApp", [])
        .controller("CategoriesController", categoriesController)
        .service("MenuHttpService", menuHttpService)
        .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
        .directive("categories", categoriesDirective);

    categoriesController.$inject = ["MenuHttpService"];

    function categoriesController(menuHttpService) {
        var cat = this;
        var categories = [];

        cat.categories = function() {
            var promise = menuHttpService.getCategories();
            promise.then(function(myItems) {
                cat.categories = myItems.data;
            });
        }
    }

    function categoriesDirective() {
        var ddo = {
            templateUrl: 'categories.html',
            scope: {
                items: '<'
            },
            controller: foundItemsDirectiveController,
            controllerAs: 'fidc',
            bindToController: true
        };
        return ddo;
    }

    function foundItemsDirectiveController() {
        var fidc = this;
    }


    menuHttpService.$inject = ["$http", "ApiBasePath"];

    function menuHttpService($http, apiBasePath) {
        var service = this;
        service.getCategories = function() {
            var response = $http({
                method: "GET",
                url: (apiBasePath + "/categories.json")
            })
            return response;
        };

    }
})();
