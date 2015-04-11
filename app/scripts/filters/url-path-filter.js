
angular.module('webdiagnostics.filters').filter('keyCount', [function () {
    return function(object) {
        return Object.keys(object).length;
    }
}]);
