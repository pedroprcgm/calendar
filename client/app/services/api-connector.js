(function () {
    'use strict';

    angular.module('calendarApp').service('apiConnector', function ($http, $rootScope, $location, authService) {
        const _base = $rootScope.constants.apiUrl;

        const _getUrl = (url, id) => {
            var finalUrl = _base + url;
            finalUrl += id
                ? "/" + id
                : '';

            return finalUrl;
        };

        this.get = (url, id) => {            

            const promise = $http.get(_getUrl(url, id))
                .then(response => {
                    if (response.data) response = response.data;
                    return response;
                })
            return promise;
        };

        this.put = (url, id, data) => {    

            const promise = $http.put(_getUrl(url, id), data)
                .then(response => {
                    if (response.data) response = response.data;
                    return response;
                });

            return promise;
        };

        this.post = (url, data) => {            
            const promise = $http.post(_getUrl(url), data)
                .then(response => {
                    if (response.data) response = response.data;
                    return response;
                })
            return promise;
        };

        this.delete = (url, id) => {            
            const promise = $http.delete(_getUrl(url, id))
                .then(response => {
                    if (response.data) response = response.data;
                    return response;
                });

            return promise;
        };

    });
})();