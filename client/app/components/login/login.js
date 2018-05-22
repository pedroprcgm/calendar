(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('LoginController', function ($scope, $timeout, apiConnector, loginService) {

            $scope.user = {};
            $scope.errorCredentials = false;

            $scope.login = () => {
                loginService.doLogin($scope.user)
                    .then( success => {
                        $location.path('/');
                    })
                    .catch(err => {
                        if(err.statusCode == 401){                            
                            $scope.errorCredentials = true;
                            $timeout( () => {
                                $scope.errorCredentials = false;
                            }, 3000)
                        }
                    });                
            };

            $scope.register = () => {
                console.log('register');
            };
        });
})()
