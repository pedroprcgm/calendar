(function () {
    'use strict';

    angular.module('calendarApp').service('userService', function ($q, apiConnector) {

        var _url = 'user';
        var _createUrl = "auth/create";

        this.get = (id) => {
            const ngPromise = $q.defer();

            apiConnector.get(_url, id)
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));             
            return ngPromise.promise;
        };

        this.add = (user) => {
            const ngPromise = $q.defer();

                apiConnector.post(_createUrl, user)
                    .then(success => {
                        ngPromise.resolve(success);
                    })
                    .catch(err => ngPromise.reject(err));

            return ngPromise.promise
        };

        this.update = (id, user) => {
            const ngPromise = $q.defer();
            apiConnector.put(_url, id, user)
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));
            return ngPromise.promise
        };

        this.delete = (id) => {
            const ngPromise = $q.defer();

            apiConnector.delete(_url, id)
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));
            return ngPromise.promise;
        };

    });
})();