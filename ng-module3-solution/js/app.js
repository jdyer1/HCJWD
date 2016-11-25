(function() {
    'use strict';

    angular.module("MenuApp", [])
        .controller("NarrowItDownController", narrowItDownController)
        .service("MenuHttpService", menuHttpService)
        .service("MenuSearchService", menuSearchService)
        .constant("ApiBasePath", "http://davids-restaurant.herokuapp.com")
        .directive("foundItems", foundItemsDirective);



    narrowItDownController.$inject = ["MenuSearchService"];

    function narrowItDownController(menuSearchService) {
        var nidc = this;
        var foundItems = [];
        var showResults = false;

        nidc.narrowItDown = function() {
          nidc.showResults = false;
            var queryString = nidc.queryString;
            var promise = menuSearchService.getMatchedMenuItems(queryString);
            promise.then(function(myItems) {
                nidc.foundItems = myItems;
                nidc.showResults = true;
            });
        }

        nidc.removeItem = function(index) {
            nidc.foundItems.splice(index, 1);
        }
    }

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'found-items.html',
            scope: {
                items: '<',
                onRemove: '=',
                showResults: "="
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
        service.getMenuItems = function(queryString) {
            var response = $http({
                method: "GET",
                url: (apiBasePath + "/menu_items.json")
            })
            return response;
        };

    }


    menuSearchService.$inject = ["$q", "MenuHttpService"];

    function menuSearchService($q, menuHttpService) {
        var service = this;
        service.getMatchedMenuItems = function(queryString) {
            var deferred = $q.defer();
            if (queryString) {
                queryString = queryString.replace(/\s/g, '').toLowerCase();
            } else {
                queryString = "";
            }
            if (queryString !== '') {
                var allItemsPromise = menuHttpService.getMenuItems(queryString);
                allItemsPromise.then(function(response) {
                    var foundItems = [];
                    for (var i in response.data.menu_items) {
                        var item = response.data.menu_items[i];
                        var desc = item.description.toLowerCase();
                        if (desc.indexOf(queryString) !== -1) {
                            foundItems.push(item);
                        }
                    }
                    deferred.resolve(foundItems);
                });
            } else {
                deferred.resolve([]);
            }
            return deferred.promise;
        };
    }

})();
