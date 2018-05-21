(function () {
    'use strict';

    angular.module('calendarApp', ['ngRoute', 'ngCookies', 'ngAnimate'])
        .config(function ($routeProvider) {
            const path = (url) => {
                return 'app/' + url;
            };

            const _isAuth = () => {
                return true;
            };

            $routeProvider
                .when('/', {
                    templateUrl: path('components/home/home.html'),
                    controller: 'HomeController',
                    resolve: {
                        isAuth: _isAuth
                    }
                })
                .when('/login', {
                    templateUrl: path('components/login/login.html'),
                    controller: 'LoginController',
                    resolve: {}
                })
                .when('/page-not-found', {
                    templateUrl: path('shared/404/404.html'),
                    controller: 'BaseController',
                    resolve: {}
                })
                .otherwise({ redirectTo: '/page-not-found' });
                
        })
        .run(function ($rootScope) {
            var _baseUrl = 'http://localhost:3001';
            var _apiUrl = 'http://localhost:8080'
            $rootScope.constants = {

                appName: 'Calendar',
                appVersion: '0.0.0.1',
                description: 'Web site para controlar a sua agenda de forma simples e eficiente',
                baseUrl: _baseUrl,
                apiUrl: _apiUrl + 'api/',
                defaultColorGreen: '#B7DB7F',
                defaultColorYellow: '#FF7F00',
                defaultColorRed: '#CD603D',
                defaultColorBlue: '#517FBC',
            };;
        })            
})();
