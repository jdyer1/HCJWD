(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', itemsController);


itemsController.$inject = ['items'];
function itemsController(items) {
  var cc = this;
  cc.items = items.data.menu_items;
}

})();
