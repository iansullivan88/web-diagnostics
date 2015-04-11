/**
 * Used to retrieve a reference to the webview used for loading pages.
 * The webview has an additional method added here called 'clearEventListeners'.
 * There is currently one webview singleton per application.
 */
angular.module('webdiagnostics.services').factory('Webview', [function () {
    var webview = document.getElementById('webview'),
        oldAddEventListener = webview.addEventListener,
        eventListeners = [];

    webview.addEventListener = function() {
        eventListeners.push(arguments);
        oldAddEventListener.apply(this, arguments);
    };

    webview.clearEventListeners = function() {
        eventListeners.forEach(function(e) {
            webview.removeEventListener.apply(webview, e);
        });
        eventListeners = [];
    };

    return {
        getWebview: function(width, height, userAgentOverride) {
            webview.style.width = width;
            webview.style.height = height;
            if (userAgentOverride) {
                webview.setUserAgentOverride(userAgentOverride);
            }
            return webview;
        }
    };
}]);
