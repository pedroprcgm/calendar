(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('LoginController', function ($scope, $location, loginService) {

            $scope.user = {};
            $scope.errorCredentials = false;

            $scope.login = () => {
                console.log('ok')
                loginService.doLogin($scope.user)
                    .then( success => {
                        $location.path('/');
                    })
                    .catch(err => {
                        if(err === 401) {
                            $scope.$apply(() => {
                                $scope.errorCredentials = true;                                
                            });                           
                        }
                    });                
            }; 
                       
            $scope.register = () => {
                $location.path('/register');
            };
        });
})()
