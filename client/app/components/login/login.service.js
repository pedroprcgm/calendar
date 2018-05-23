(function() {
    'use strict';

    angular.module('calendarApp').service('loginService', function (apiConnector, $location, authService) {

        const _getAuthUrl = () => {
            return 'auth';
        };

        this.doLogin = (user) => {
            return new Promise( (resolve, reject) => {
                apiConnector.post(_getAuthUrl(), user, {auth: false})
                    .then( response => {
                        authService.auth(response);                        
                        resolve();
                    })
                    .catch( err => {
                        if(err.data) err = err.data;
                        reject(err.statusCode);
                    });
            });
        }

    });
})()