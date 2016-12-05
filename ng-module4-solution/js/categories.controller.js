(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', categoriesController);


categoriesController.$inject = ['categories'];
function categoriesController(categories) {
  var cc = this;
  cc.categories = categories.data;
}

})();
