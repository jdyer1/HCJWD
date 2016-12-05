(function() {
    'use strict';

    angular.module('MenuApp')
        .service('MenuDataService', menuDataService)
        .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

    menuDataService.$inject = ['$http', "ApiBasePath"]

    function menuDataService($http, apiBasePath) {
        var mds = this;
        mds.getAllCategories = function() {
            var response = $http({
                method: "GET",
                url: (apiBasePath + "/categories.json")
            });
            return response;
        }
        mds.getItemsForCategory = function(shortName) {
            var response = $http({
                method: "GET",
                url: (apiBasePath + "/menu_items.json?category=" + shortName)
            });
            return response;
        }
    }
})();
