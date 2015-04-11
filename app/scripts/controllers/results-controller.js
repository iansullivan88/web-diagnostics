angular.module('webdiagnostics.controllers').controller('ResultsCtrl', ['$scope', '$location', 'Options', 'WebsiteDiagnostics', function($scope, $location, optionsService, websiteDiagnostics) {
    var options = optionsService.getOptions();
    $scope.context = websiteDiagnostics.processWebsite(options);
}]);
