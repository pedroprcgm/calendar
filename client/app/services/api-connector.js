(function() {
    'use strict';

    angular.module('calendarApp').service('apiConnector', function ($http, $rootScope, $location, authService) {
        const _base = $rootScope.constants.apiUrl;

        const _getUrl = (url, id) => { 
            var finalUrl = _base + url; 
            finalUrl += id 
                ?  "/" + id 
                : '';

            return finalUrl;
        }

        const _handlerOptions = (options) => {
            if(!options) return {};
            const _opt = {};
            if(options.auth){
                _opt.headers = { 'Authorization': authService.auth().token };
            }
            return _opt;
        }
            

        this.get = (url, id, options) => {
            const opt = _handlerOptions(options);

            const promise = $http.get(_getUrl(url, id), opt)
                .then( response => {
                    if(response.data) response = response.data;
                    return response;
                });

            return promise;
        };

        this.put = (url, id, data, options) => {
            const opt = _handlerOptions(options);
            const promise = $http.put(_getUrl(url), id, data, opt)
                .then( response => {
                    if(response.data) response = response.data;
                    return response;
                });

            return promise;
        };

        this.post = (url, data, options) => {
            const opt = _handlerOptions(options);
            const promise = $http.post(_getUrl(url), data, opt)
                .then( response => {
                    if(response.data) response = response.data;
                    return response;
                })
            return promise;            
        };

        this.delete = (url, id, options) => {
            const opt = _handlerOptions(options);
            const promise = $http.delete(_getUrl(url), id, opt)
                .then( response => {
                    if(response.data) response = response.data;
                    return response;
                });

            return promise;
        };
        
    });
})();