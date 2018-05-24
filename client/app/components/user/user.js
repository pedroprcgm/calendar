(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('UserController', function ($scope, $routeParams, $route, $location, userService, authService) {

            $scope.id = authService.auth().user.id;

            userService.get($scope.id)
                .then(user => {
                    $scope.user = user;
                })
                .catch(err => console.log(err));

            $scope.submit = (event, data) => {
                userService.update($scope.id, data)
                    .then(success => {
                        alert('Atualizado');
                        $route.reload();
                    })
                    .catch(err => console.log(err));
            };

            $scope.delete = () => {
                userService.delete($scope.id)
                    .then(success => {
                        alert('Removido');
                        authService.clear();
                        $location.path('/login');
                    })
                    .catch(err => console.log(err));
            };
        });

})()
