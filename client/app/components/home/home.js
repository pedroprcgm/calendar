(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('HomeController', function ($scope, $location, eventService) {

            $scope.events = [];

            var _init = () => {                
                eventService.getAll()
                    .then( events => {
                        $scope.events = events;
                    })
                    .catch( err => console.log(err));
            };
            _init();

            $scope.edit = id => {
                $location.path('/edit/' + id);
            };

        });

})()
