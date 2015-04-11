
angular.module('webdiagnostics.filters').filter('loggingLevel', [function () {
    return function(level) {
        switch(level) {
            case 0: return "log";
            case 1: return "warn";
            case 2: return "error";
            default: return level;
        }
    }
}]);
