window.WebDiagnostics = window.WebDiagnostics || {};
window.WebDiagnostics.Helpers = window.WebDiagnostics.Helpers || {};

window.WebDiagnostics.Helpers.qHelpers = {
    // Returns a promise that expires after the given interval
    timeout:function($q, milliseconds) {
        return $q.Deferred(function(resolve) {
            setTimeout(resolve, milliseconds);
        });
    },
    // Propagates the first promise to complete
    first:function($q, promises) {
        var completed = false;
        return $q.Deferred(function(resolve, reject) {
            promises.forEach(function(promise) {
                promise.then(function() {
                    if (!resolved) {
                        completed = true;
                        resolve();
                    }
                }, function() {
                    if (!resolved) {
                        completed = true;
                        reject();
                    }
                });
            });
        });
    }
};
