(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('eventForm', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    model: '=',
                    onSubmit: '='
                },
                controller: function($scope){
                },
				templateUrl: 'app/shared/event-form/event-form.html'
			}
		});
})();
