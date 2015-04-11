angular.module('webdiagnostics.controllers').controller('PageLoadTimesCtrl', ['$scope', function($scope) {

    $scope.$watchCollection('pluginContext.results', function() {

        if ($scope.pluginContext.results.length) {

            $scope.averagePageLoadTime = $scope.pluginContext.results.reduce(function(total, result) {
                return total + result.data.responseDuration
            }, 0) / $scope.pluginContext.results.length;

            $scope.averageAssetLoadTime = $scope.pluginContext.results.reduce(function(total, result) {
                return total + result.data.assetLoadDuration
            }, 0) / $scope.pluginContext.results.length;

        }
    });
}]);
