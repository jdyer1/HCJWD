(function() {
    'use strict';
    angular.module('LunchApp', []).controller('LunchAppController', LunchAppController);

    LunchAppController.$inject = ['$scope'];

    function LunchAppController($scope) {
        $scope.checkIfTooMuch = checkIfTooMuch;
        $scope.lunchMessage = "";
        $scope.lunchStyle = {};

        function checkIfTooMuch() {
            $scope.lunchMessage = "";
            var rawItems = $scope.lunchItems;
            rawItems = rawItems == null ? "" : rawItems;
            var splitItems = rawItems.split(",");
            var splitItemsNoDup = [];
            for (var i = 0; i < splitItems.length; i++) {
                if (splitItems[i].trim().length > 0) {
                    splitItemsNoDup.push(splitItems[i]);
                }
            }
            if (splitItemsNoDup.length === 0) {
                pleaseEnterData();
            } else if (splitItemsNoDup.length < 4) {
                enjoy();
            } else {
                tooMuch();
            }
        }

        function pleaseEnterData() {
            $scope.lunchMessage = "Please Enter Data First";
            $scope.lunchStyle = {"color":"red", "border": "1px solid red", "padding" : "3px"};
        }
        function enjoy() {
            $scope.lunchMessage = "Enjoy!";
            $scope.lunchStyle = {"color":"green", "border": "1px solid green", "padding" : "3px"};
        }

        function tooMuch() {
            $scope.lunchMessage = "Too Much!";
            $scope.lunchStyle = {"color":"green", "border":"1px solid green", "padding" : "3px"};
        }
    }
})();
