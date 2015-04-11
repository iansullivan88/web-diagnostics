angular.module('webdiagnostics.services').factory('Url', [function () {
    var a = document.createElement('a');

    return {
        getHost: function(url) {
            a.href = url;
            return a.host;
        },
        getPath: function(url) {
            a.href = url;
            return a.pathname;
        },
        // Creates a unique id for the given page. Ignores 'hash' portion of the url
        getUrlId: function(url) {
            a.href = url;
            var path = trim(a.pathname);
            path = trim(path, '/');
            return a.host + '/' + path + a.search;
        }
    };

    // Trim the start and end of a string
    function trim(string, characters) {
        // Default to trimming whitespace
        var characters = characters || '\\s';
        var regex = new RegExp('(^[' + characters + ']+)|([' + characters +']+$)', 'g');
        return string.replace(regex, '');
    }

}]);
