(function () {
    'use strict';

    angular.module('calendarApp').service('eventService', function ($q, apiConnector) {

        var _url = 'event';

        this.getAll = () => {
            const aPromise = $q.defer();
            apiConnector.get(_url, null, { auth: true })
                .then(success => {
                    aPromise.resolve(success);
                })
                .catch(err => aPromise.reject(err));

            return aPromise.promise;
        };

        this.get = (id) => {
            const aPromise = $q.defer();

            apiConnector.get(_url, id)
                .then(success => {
                    aPromise.resolve(success);
                })
                .catch(err => aPromise.reject(err));

            return aPromise.promise;
        };

        this.add = (user) => {
            const aPromise = $q.defer();
            apiConnector.post(_createUrl, user)
                .then(success => {
                    aPromise.resolve(success);
                })
                .catch(err => aPromise.reject(err));
            return aPromise.promise
        };

        this.update = (id, user) => {
            const aPromise = $q.defer();
                apiConnector.post(_createUrl, user)
                    .then(success => {
                        aPromise.resolve(success);
                    })
                    .catch(err => aPromise.reject(err));
            return aPromise.promise;
        };

        this.delete = (id) => {

        };

    });
})();