(function() {
    'use strict';

    angular.module('calendarApp').service('loginService', function ($q, $location, apiConnector, authService) {

        const _getAuthUrl = () => {
            return 'auth';
        };

        this.doLogin = (user) => {
            const ngPromise = $q.defer();
        
            apiConnector.post(_getAuthUrl(), user, {auth: false})
                .then( response => {
                    authService.auth(response);                        
                    ngPromise.resolve();
                })
                .catch( err => {
                    if(err.data) err = err.data;
                    ngPromise.reject(err.statusCode);
                });
            return ngPromise.promise;
        };

    });
})()