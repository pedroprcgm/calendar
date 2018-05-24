(function () {
    'use strict';

    angular.module('calendarApp', ['ngRoute', 'ngCookies', 'ngAnimate'])
        .config(function ($routeProvider, $httpProvider) {

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
                .when('/create', {
                    templateUrl: path('components/event/event.html'),
                    controller: 'EventController',
                    resolve: {
                        auth: Auth
                    }
                })        
                .when('/edit/:id', {
                    templateUrl: path('components/event/event.html'),
                    controller: 'EventController',
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

            $httpProvider.interceptors.push(['$q', '$location', 'authService', function($q, $location, authService) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if (authService.auth().token) {
                            config.headers.Authorization = authService.auth().token;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        var responseData = {};
                        if(response.data) responseData = response.data;

                        if (response.status === 401 || response.status === 403
                            || responseData.statusCode === 401 || responseData.statusCode === 403) {
                            authService.clear();
                            $location.path('/login');
                        }
                        if (response.status === 500 || responseData.statusCode === 500) {
                            $location.path('/internal-error');
                        }
                        return $q.reject(response);
                    }
                };
            }]);                
                
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
