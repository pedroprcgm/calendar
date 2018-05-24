(function () {
    'use strict';

    angular.module('calendarApp').service('eventService', function ($q, apiConnector) {

        var _url = 'event';

        this.getAll = () => {
            const ngPromise = $q.defer();

            apiConnector.get(_url, null, { auth: true })
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));

            return ngPromise.promise;
        };

        this.get = (id) => {
            const ngPromise = $q.defer();

            apiConnector.get(_url, id)
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));

            return ngPromise.promise;
        };

        this.add = (event) => {
            const ngPromise = $q.defer();

            apiConnector.post(_url, event)
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));
            return ngPromise.promise
        };

        this.update = (id, event) => {
            const ngPromise = $q.defer();

            apiConnector.put(_url, id, event)
                .then(success => {
                    ngPromise.resolve(success);
                })
                .catch(err => ngPromise.reject(err));
            return ngPromise.promise;
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