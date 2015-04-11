angular.module('webdiagnostics.controllers', []);
angular.module('webdiagnostics.filters', []);
angular.module('webdiagnostics.services', []);
angular.module('webdiagnostics', [
    'ngRoute',
    'webdiagnostics.controllers',
    'webdiagnostics.filters',
    'webdiagnostics.services'
]).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/results', {
            templateUrl: 'views/results.html',
            controller: 'ResultsCtrl'
        }).
        otherwise({
            templateUrl: 'views/options.html',
            controller: 'OptionsCtrl'
        });
    }
]);
