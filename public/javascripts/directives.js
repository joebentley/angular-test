'use strict';


// Attach ot an element to make it act as a link
// <... go-click="path/to/place" ...>
app.directive('goClick', function ($location) {
  return function ($scope, element, attrs) {
    var path;

    attrs.$observe('goClick', function (url) {
      path = url;
    });

    element.bind('click', function () {
      $scope.$apply(function () {
        $location.path(path);
      });
    });
  };
});
