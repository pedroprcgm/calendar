(function() {
    'use strict';

    angular.module('calendarApp').service('loginService', function (apiConnector, $location) {

        const _getAuthUrl = () => {
            return 'auth';
        };

        this.doLogin = (user) => {
            return new Promise( (resolve, reject) => {
                apiConnector.post(_getAuthUrl(), user)
                    .then( response => {
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('user', response.user);
                        resolve();
                    })
                    .catch( err => {
                        reject(err.data || err);
                    });
            });
        }

    });
})()