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

app.factory('loginFactory', function ($http) {
  return {
    login: function (user, callback) {
      $http.post('login', user).success(callback);
    },

    logout: function (callback) {
      $http.get('logout').success(callback);
    },

    checkLogin: function (callback) {
      $http.get('check_login').success(callback);
    }
  };
});
