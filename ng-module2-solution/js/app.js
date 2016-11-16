(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', toBuyController)
        .controller('AlreadyBoughtController', alreadyBoughtController)
        .service('ShoppingListCheckOffService', shoppingListCheckOffService);

    toBuyController.$inject = ['ShoppingListCheckOffService'];

    function toBuyController(shoppingListCheckOffService) {
      var tbc = this;

      tbc.items = shoppingListCheckOffService.getToBuy();

      tbc.buyItem = function(i) {
        shoppingListCheckOffService.buyItem(i);
      }
    }

    alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function alreadyBoughtController(shoppingListCheckOffService) {
      var abc = this;

      abc.items = shoppingListCheckOffService.getAlreadyBought();
    }

    function shoppingListCheckOffService() {
        var service = this;

        var toBuy = [];
        var alreadyBought = [];

        service.addItemToBuy = function(itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            toBuy.push(item);
        };

        service.addItemToBuy("chicken", 1);
        service.addItemToBuy("rice", 1);
        service.addItemToBuy("black beans", 1);
        service.addItemToBuy("tortillas", 10);
        service.addItemToBuy("tomato", 3);
        service.addItemToBuy("green pepper", 1);
        service.addItemToBuy("shredded cheeze, oz", 16);
        service.addItemToBuy("chips, bag", 1);
        service.addItemToBuy("salsa jar", 1);

        service.buyItem = function(i) {
            var bought = toBuy.splice(i, 1);
            alreadyBought.push(bought[0]);
        };

        service.getToBuy = function() {
          return toBuy;
        };

        service.getAlreadyBought = function() {
          return alreadyBought;
        };
    }

})();
