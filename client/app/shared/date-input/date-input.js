(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('dateInput', function() {			
			return {
			    restrict: 'E',
			    scope: {
					customId: '@',
                    label: '@',
                    model: '=',
                    required: '=',
                },
                controller: function($scope){
                    $scope.id = $scope.customId 
						? $scope.customId 
						: 'date-input-' + $scope.$id; 
                },
				templateUrl: 'app/shared/date-input/date-input.html'
			}
		});
})();
