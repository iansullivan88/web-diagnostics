angular.module('webdiagnostics.controllers').controller('PageErrorsCtrl', ['$scope', function($scope) {

    $scope.$watchCollection('pluginContext.results', function() {
        $scope.hasErrors = false;
        $scope.pluginContext.results.forEach(function(result) {
            result.data.forEach(function(message) {
                $scope.hasErrors = true;
            });
        });
    });

}]);
