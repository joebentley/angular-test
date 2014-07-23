'use strict';


app.factory('searchFactory', function ($http) {
  return {
    getItems: function (callback) {
      // Send an Ajax request to /search, callback will be given the results
      $http.get('search').success(callback);
    }
  };
});


