(function () {
    'use strict';

    angular.module('calendarApp').service('userService', function (apiConnector) {

        var _url = 'user';
        var _createUrl = "auth/create";

        this.get = (id) => {
            return new Promise((resolve, reject) => {
                apiConnector.get(_url, id)
                    .then(success => {
                        resolve(success);
                    })
                    .catch(err => reject(err));
            });
            
        };

        this.add = (user) => {
            return new Promise((resolve, reject) => {
                apiConnector.post(_createUrl, user)
                    .then(success => {
                        resolve(success);
                    })
                    .catch(err => reject(err));
            });
        };

        this.update = (id, user) => {
            return new Promise((resolve, reject) => {
                apiConnector.post(_createUrl, user)
                    .then(success => {
                        resolve(success);
                    })
                    .catch(err => reject(err));
            });
        };

        this.delete = (id) => {

        };

    });
})();