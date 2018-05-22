(function() {
    'use strict';

    angular.module('calendarApp').service('apiConnector', function ($http, $rootScope, $location) {
        var _base = $rootScope.constants.apiUrl;

        var _getUrl = (url) => { return _base + url};

        this.get = (url) => {

            var promise = $http.get(_getUrl(url))
                .then( response => {
                    return response;
                });

            return promise;
        };

        this.put = (url, id, data) => {
            var promise = $http.put(_getUrl(url), id, data)
                .then( response => {
                    return response;
                });

            return promise;
        };

        this.post = (url, data) => {
            
            var promise = $http.post(_getUrl(url), data)
                .then( response => {
                    return response;
                })
                // .catch( err => {
                //     if(err.data) err = err.data;
                //     if(err.statusCode === 500) {
                //         $location.path('/internal-error');
                //         return;
                //     }
                //     return err;
                // });
            return promise;            
        };

        this.delete = (url, id) => {
            var promise = $http.delete(_getUrl(url), id)
                .then( response => {
                    return response;
                });

            return promise;
        };
        
    });
})();