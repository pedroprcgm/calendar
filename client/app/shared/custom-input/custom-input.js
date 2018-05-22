(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('customInput', function() {			
			return {
			    restrict: 'E',
			    scope: {
					customId: '@',
					type: '@',
                    label: '@',
                    model: '=',
                    required: '=',
                    placeholder: '@?',
                },
                controller: function($scope){

                },
				templateUrl: 'app/shared/custom-input/custom-input.html'
			}
		});
})();
