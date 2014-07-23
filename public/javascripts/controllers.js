'use strict';


app.controller('searchController', function ($scope, searchFactory) {
  searchFactory.getItems(function (results) {
    // populate our items with the results of the ajax call
    $scope.items = results;
  });
});

app.controller('itemController', function ($scope, $routeParams, searchFactory) {
  searchFactory.getItems(function (results) {
    // Get phone specified in route params
    var result = $.grep(results, function (object) { return object.name === $routeParams.itemName; });

    // Check that item was found
    if (result.length == 0) {
      // not found
    } else if (result.length == 1) {
      $scope.item = result[0]
    }
  });
});
