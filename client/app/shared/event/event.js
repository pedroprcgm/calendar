(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('eventItem', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    data: '='
                },
                controller: function($scope){                    
                },
				templateUrl: 'app/shared/event/event.html'
			}
		});
})();
