'use strict';

var app = angular.module('search', [ 'ngRoute' ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/search',
      {
        controller: 'searchController',
        templateUrl: 'partials/search.html'
      })
    .when('/items/:itemName',
      {
        controller: 'itemController',
        templateUrl: 'partials/detail.html'
      })
    .otherwise({ redirectTo: '/search' });
});

