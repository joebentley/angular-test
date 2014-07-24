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
        controller: 'itemViewController',
        templateUrl: 'partials/detail.html'
      })
    .when('/create',
      {
        controller: 'itemCreateController',
        templateUrl: 'partials/create.html'
      })
    .otherwise({ redirectTo: '/search' });
});
