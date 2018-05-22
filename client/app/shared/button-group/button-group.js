(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('buttonGroup', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    formId: '@?',
                    primaryMessage: '@',
                    primaryAction: '=',
                    secondary: '=?',
                    secondaryMessage: '@',
                    secondaryAction: '='
                },
                controller: function($scope){
                },
				templateUrl: 'app/shared/button-group/button-group.html'
			}
		});
})();
