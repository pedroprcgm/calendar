(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('LoginController', function ($scope, $location, loginService, authService) {

            $scope.user = {};
            $scope.errorCredentials = false;

            if(authService.auth().token && authService.auth().token !== 'undefined'){
                $location.path('/');
            }

            $scope.login = () => {
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
