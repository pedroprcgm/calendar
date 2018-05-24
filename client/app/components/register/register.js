(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('RegisterController', function ($scope, $location, $timeout, userService) {

            $scope.user = {};

            $scope.submit = (event, user) => {          
                userService.add(user)
                    .then( success => {
                        $location.path('/login');
                    })
                    .catch( err => {
                        alert('Ocorreu um erro');
                    });
            };

        });
})()
