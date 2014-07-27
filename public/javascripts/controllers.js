'use strict';


app.controller('searchController', function ($scope, itemFactory, loginFactory) {

  loginFactory.checkLogin(function (data) {
    if (data === "success") {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    }
  });

  itemFactory.getItems(function (results) {
    // populate our items with the results of the ajax call
    $scope.items = results;
  });

  $scope.logout = function () {
    loginFactory.logout(function () {
      $scope.loggedIn = false;
    });
  };
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
    itemFactory.pushItem($scope.item, function (data) {
      // Redirect if logged in
      if (data === "success") {
        $location.path("/search");
      } else {
        // Print error message
        $scope.submitFailed = true;
      }
    });
  };
});

app.controller('loginController', function ($scope, loginFactory, $location) {
  // Set default fail state
  $scope.loginFailed = false;

  $scope.submitLogin = function () {
    loginFactory.login($scope.user, function (data) {
      if (data === "success") {
        // Redirect to home screen
        $location.path("/search");
      } else {
        $scope.loginFailed = true;
      }
    });
  };
});
