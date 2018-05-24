(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('eventItem', function($location) {			
			return {
			    restrict: 'E',
			    scope: {
                    data: '='
                },
                controller: function($scope){                    
					$scope.edit = () => {
						$location.path('/edit/' + $scope.data.id);
					};
                },
				templateUrl: 'app/shared/event-item/event-item.html'
			}
		});
})();
