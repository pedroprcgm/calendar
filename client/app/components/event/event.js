(function () {
    'use strict';

    angular.module('calendarApp')
        .controller('EventController', function ($scope, $routeParams, $route, $location, eventService, utilService) {

            $scope.isEdit = undefined;
            $scope.id = undefined;

            if($routeParams.id){
                $scope.isEdit = true;
                $scope.id = $routeParams.id;

                eventService.get($scope.id)
                    .then( event => { 
                        const convertedDates = utilService.dateToClient(event.startDate, event.endDate);
                        event.startDate = convertedDates[0];
                        event.endDate = convertedDates[1];
                        $scope.event = event;
                    })
                    .catch( err => {
                        if(err.status === 400) $location.path('/');
                    });

            } else {
                $scope.isEdit = false;
                $scope.event = {};
            }

            $scope.submit = (event, data) => {

                if($scope.isEdit){
                    
                    eventService.update($scope.id, data)
                        .then( success => {
                            alert('Atualizado');
                            $route.reload();
                        })
                } else {
                    // adicionar
                    eventService.add(data)
                        .then( success => {
                            alert('Adicionado');
                            $location.path('/');
                        })
                        .catch( err => {
                            if(err.data) err = data;
                            if(err.statusCode === 400 || err.status === 400){
                                alert('Verifique os campos');
                            }
                        })
                }
            };

            $scope.delete = () => {

                eventService.delete($scope.id)
                    .then( success => {
                        alert('Removido');
                        $location.path('/')
                    })
                    .catch( err => console.log(err));
            };
            

        });

})()
