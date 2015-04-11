/**
 * @description
 *
 * Used for passing chosen options between views
 */
angular.module('webdiagnostics.services').factory('WebsiteDiagnostics', ['$q', 'Webview', 'Url', function ($q, webviewService, urlService) {
    var activeContext;

    return {
        processWebsite: function(options) {
            if (activeContext) {
                // Don't start multiple contexts
                return null;
            }

            activeContext = createContext(options);
            processNextPath(activeContext);
            return activeContext;
        }
    };

    function processNextPath(context) {
        var urlToProcess = context.urlsToProcess.pop();
        if (!urlToProcess || Object.keys(context.processedUrlIds).length >= context.options.maxPages) {
            context.complete = true;
            return;
        }

        var urlId = urlService.getUrlId(urlToProcess);
        context.currentUrl = urlToProcess;
        context.processedUrlIds[urlId] = true;
        console.log(urlId);

        webview.stop();

        // Get results from each plugin
        var resultPromises = [];
        context.pluginContexts.forEach(function(pc) {
            var deferredResult = $q.defer();
            resultPromises.push(deferredResult.promise.then(function(result) {
                pc.results.push({
                    url: urlToProcess,
                    data: result
                });
            }));
            pc.plugin.processPage(deferredResult, context.webview);
        });

        // Find next pages to search
        var linkedUrlsPromise = getLinkedUrls(context.webview).then(function(urls) {
            urls.filter(function(url) {
                return context.host === urlService.getHost(url);
            }).forEach(function(url) {
                var newUrlId = urlService.getUrlId(url);
                if (!context.processedUrlIds.hasOwnProperty(newUrlId)) {
                    context.urlsToProcess.push(url);
                }
            });
        })

        // Process next url when the plugins have finished and next urls to process have been found
        $q.all(resultPromises.concat([linkedUrlsPromise])).then(function() {
            context.webview.clearEventListeners();
            context.currentUrl = null;
            processNextPath(context);
        });

        // Set src after ensuring cache is cleared.
        // The callback is only called if the cache isn't empty.
        // Call it after a delay in case the callback never fires.
        if (context.options.clearCacheEveryPage) {
            var cleared = false;
            webview.clearData({}, {appcache:true}, function() {
                if (!cleared) {
                    webview.src = urlToProcess;
                    cleared = true;
                }
            });

            setTimeout(function() {
                if (!cleared) {
                    webview.src = urlToProcess;
                    cleared = true;
                }
            }, 1000);
        } else {
            webview.src = urlToProcess;
        }


    }

    function getLinkedUrls(webview) {
        return $q(function(resolve, reject) {
            webview.addEventListener("contentload", function(e) {
                webview.executeScript({ code: "Array.prototype.map.call(document.querySelectorAll('a'), function(a) {return a.href;});" }, function(result) {
                    resolve(result[0]);
                });
            });
        });
    }

    function createContext(options) {
        return {
            host: urlService.getHost(options.url),
            processedUrlIds: {},
            urlsToProcess: [options.url],
            options: options,
            webview: webviewService.getWebview(options.pageWidth, options.pageHeight, options.overridenUserAgent),
            pluginContexts: WebDiagnostics.plugins.map(function(p) {
                return {
                    plugin: p,
                    results: [],
                    viewPath: 'views/plugins/' + p.view
                };
            })
        };
    }

}]);
