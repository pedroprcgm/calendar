(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('navBar', function(authService, $location) {			
			return {
			    restrict: 'E',
			    scope: {
                },
                controller: function($scope){

                    $scope.auth = () => {
                        return authService.auth().token && authService.auth().token !== "undefined"
					};
					
					$scope.isActive = (url) => {
						return $location.path() === url 
							? 'active'
							: '';
					};	

					$scope.logout = () => {
						authService.clear();
						$location.path('/login');
					};
                },
				templateUrl: 'app/shared/nav-bar/nav-bar.html'
			}
		});
})();
