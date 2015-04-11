/**
 * @description
 *
 * Converts a full url to a path
 */
angular.module('webdiagnostics.filters').filter('urlPath', ['Url', function (urlService) {
    return function(url) {
        return urlService.getPath(url);
    }
}]);
