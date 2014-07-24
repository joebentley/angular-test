'use strict';


app.controller('searchController', function ($scope, itemFactory) {
  itemFactory.getItems(function (results) {
    // populate our items with the results of the ajax call
    $scope.items = results;
  });
});

app.controller('itemViewController', function ($scope, $routeParams, itemFactory) {
  itemFactory.getItems(function (results) {
    // Get phone specified in route params
    var result = $.grep(results, function (object) { return object.name === $routeParams.itemName; });

    // Check that item was found
    if (result.length === 0) {
      $scope.itemExists = false;

      // Set name for error message
      $scope.badName = $routeParams.itemName;

    } else if (result.length === 1) {
      // Item was found
      $scope.itemExists = true;

      // Set current item to result
      $scope.item = result[0];
    }
  });
});

app.controller('itemCreateController', function ($scope, itemFactory, $location) {

  // Called when item is to be submitted
  $scope.submitItem = function () {
    itemFactory.pushItem($scope.item);
  }
});
