'use strict';


app.factory('itemFactory', function ($http) {
  return {
    getItems: function (callback) {
      // Send an Ajax request to /search, callback will be given the results
      $http.get('search').success(callback);
    },

    pushItem: function (item, callback) {
      $http.put('create', item).success(callback);
    }
  };
});
