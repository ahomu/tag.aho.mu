var App;
App = angular.module('Admin', []);

App.directive('tagitem', ['$http', function($http) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div>{{tag.name}}<button ng-click="onClickRemove()">remove</button></div>',
    link: function(scope, element, attr) {
      scope.onClickRemove = function() {
        $http.delete('/admin/tag/'+scope.tag.name, {name: scope.tag.name})
          .success(function(res) {
            var parentTags = scope.$parent.tags
            parentTags.splice(parentTags.indexOf(scope.tag), 1);
            console.log(res);
          })
          .error(function(res) {
            console.log(res);
          });
      };
    }
  }
}]);

App.controller('Tags', ['$scope', '$http', function($scope, $http) {

  $http.get('/admin/tag')
    .success(function(res) {
      $scope.tags = res.items;
    });

  $scope.onSubmit = function() {
    $http.post('/admin/tag', {name: this.name})
      .success(function(res) {
        $scope.tags.push(res.tag);
        console.log(res);
      })
      .error(function(res) {
        console.log(res);
      });
  };
}]);
