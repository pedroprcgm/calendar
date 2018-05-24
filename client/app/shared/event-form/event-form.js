(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('eventForm', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    model: '=',
					onSubmit: '=',
					delete: '=?',
					onDelete: '=?'
                },
                controller: function($scope){
                },
				templateUrl: 'app/shared/event-form/event-form.html'
			}
		});
})();
