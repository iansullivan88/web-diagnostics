angular.module('webdiagnostics.controllers').controller('OptionsCtrl', ['$scope', '$location', 'Options', function($scope, $location, optionsService) {

    $scope.options = {
        maxPages: 50,
        clearCacheEveryPage: true,
        pageWidth: 1024,
        pageHeight: 768,
        overridenUserAgent: ''
    };

    $scope.start = function() {
        optionsService.setOptions($scope.options);
        $location.path('/results');
    };

}]);
