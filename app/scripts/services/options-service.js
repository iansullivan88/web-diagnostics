/**
 * @description
 *
 * Used for passing chosen options between views
 */
angular.module('webdiagnostics.services').factory('Options', [function () {
    var options = null;

    return {
        setOptions: function(o) { options = o; },
        getOptions: function() { return options; }
    };
}]);
