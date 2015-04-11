window.WebDiagnostics = window.WebDiagnostics || {};
window.WebDiagnostics.plugins = [
    {
        name: "Page Load Times",
        description: "Some description",
        priority: 1,
        view: "page-load-times.html",
        processPage: function(result, webview) {
            var urlTimes = {};
            webview.addEventListener("loadstart", function(e) {
                if (e.isTopLevel) {
                    urlTimes.requestTime = Date.now();
                }
            });
            webview.addEventListener("loadcommit", function(e) {
                if (e.isTopLevel) {
                    urlTimes.responseTime = Date.now();
                    urlTimes.responseDuration = urlTimes.responseTime - urlTimes.requestTime;
                }
            });
            webview.addEventListener("contentload", function(e) {
                    urlTimes.contentLoadTime = Date.now();
                    urlTimes.assetLoadDuration = urlTimes.contentLoadTime - urlTimes.responseTime;
                    result.resolve(urlTimes);
            });
        }
    },
    {
        name: "Page Errors",
        description: "Some description",
        view: "page-errors.html",
        processPage: function(result, webview) {
            var messages = [];
            webview.addEventListener("consolemessage", function(e) {
                if (e.level) {
                    messages.push({
                        message: e.message,
                        line: e.line,
                        level: e.level
                    });
                }
            });
            webview.addEventListener("contentload", function(e) {
                // Assume that after 1s, we have caught all initialisation errors
                setTimeout(function() {
                    result.resolve(messages);
                }, 1000);
            });
        }
    },
];
