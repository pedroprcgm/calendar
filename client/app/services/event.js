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

        this.add = (event) => {
            const aPromise = $q.defer();

            apiConnector.post(_url, event)
                .then(success => {
                    aPromise.resolve(success);
                })
                .catch(err => aPromise.reject(err));
            return aPromise.promise
        };

        this.update = (id, event) => {
            const aPromise = $q.defer();
            
            apiConnector.put(_url, id, event)
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