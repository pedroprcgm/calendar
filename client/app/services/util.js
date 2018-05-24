(function() {
    'use strict';

    angular.module('calendarApp').service('utilService', function ($filter) {

        this.dateToClient = (...data) => {
            return data.map( d => {
                return new Date(d);
            });
        };
    })
})();
