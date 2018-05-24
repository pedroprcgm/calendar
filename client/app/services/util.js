(function() {
    'use strict';

    angular.module('calendarApp').service('utilService', function ($filter) {

        this.dataToClient = (...data) => {
            return data.map( d => {
                return new Date(d);
            });
        };
    })
})();
