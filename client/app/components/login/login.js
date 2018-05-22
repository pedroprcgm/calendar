(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('LoginController', function ($scope) {

            $scope.login = () => {
                console.log('called');
            };

            $scope.register = () => {
                console.log('register');
            };
        });
})()
