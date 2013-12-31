var App;
App = angular.module('App', []);

App.controller('Tag', ['$scope', '$http', function($scope, $http) {

  $http.get('/tag')
    .success(function(res) {
      $scope.tags = res.items;
    });

  $scope.onClickTag = function() {
    $http.get('/article?tag=' + this.tag.name)
      .success(function(res) {
        // TODO implment UI
        console.log(res);
      })
      .error(function(res) {
        console.log(res);
      });
  };

}]);
