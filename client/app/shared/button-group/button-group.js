(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('buttonGroup', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    formId: '@?',
                    primaryMessage: '@',
                    primaryAction: '&',
                    secondary: '=?',
                    secondaryMessage: '@',
                    secondaryaction: '='
                },
                controller: function($scope, $location){
                    $scope.secondaryWrapper = () => {
                        if($scope.secondaryAction){
                            $scope.secondaryAction();
                        }
                    }
                },
				templateUrl: 'app/shared/button-group/button-group.html'
			}
		});
})();
