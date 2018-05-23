(function () {
    'use strict';

    angular.module('calendarApp', ['ngRoute', 'ngCookies', 'ngAnimate'])
        .config(function ($routeProvider) {

            const path = (url) => {
                return 'app/' + url;
            };

            // function to check the authentication //
            const Auth = ["$q", "authService", function ($q, authService) {
                if(!authService.auth().token || authService.auth().token === "undefined") {
                    return $q.reject({ authenticated: false });
                }

            }];

            $routeProvider
                .when('/', {
                    templateUrl: path('components/home/home.html'),
                    controller: 'HomeController',
                    resolve: {
                        auth: Auth
                    }
                })
                .when('/login', {
                    templateUrl: path('components/login/login.html'),
                    controller: 'LoginController',
                    resolve: {}
                })
                .when('/register', {
                    templateUrl: path('components/register/register.html'),
                    controller: 'RegisterController',
                    resolve: {}
                })                
                .when('/page-not-found', {
                    templateUrl: path('shared/404/404.html'),
                    controller: 'BaseController',
                    resolve: {}
                })
                .when('/internal-error', {
                    templateUrl: path('shared/500/500.html'),
                    controller: 'BaseController',
                    resolve: {}
                })
                .otherwise({ redirectTo: '/page-not-found' });
                
        })
        .run(function ($rootScope, $location) {
            var _apiUrl = 'http://localhost:3000';
            var _baseUrl = 'http://localhost:8080'
            $rootScope.constants = {
                appName: 'Calendar',
                appVersion: '0.0.0.1',
                description: 'Web site para controlar a sua agenda de forma simples e eficiente',
                baseUrl: _baseUrl,
                apiUrl: _apiUrl + '/api/',
                defaultColorGreen: '#B7DB7F',
                defaultColorYellow: '#FF7F00',
                defaultColorRed: '#CD603D',
                defaultColorBlue: '#517FBC',
            };
            $rootScope.$on('$routeChangeError', function(event, curr, prev, reject) {
                if(reject.authenticated == false) {
                    $location.path('/login')
                }
            });
        });
})();
