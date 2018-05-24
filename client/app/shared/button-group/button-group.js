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
                    secondaryMessage: '@?',
                    secondaryaction: '=?',
                    delete: '=?',
                    deleteAction: '=?'
                },
                controller: function($scope, $location){
                    $scope.secondaryWrapper = () => {
                        if($scope.secondaryAction){
                            $scope.secondaryAction();
                        }
                    };

                    $scope.deleteActionWrapper = () => {
                        if($scope.deleteAction){
                            $scope.deleteAction();
                        }
                    };

                },
				templateUrl: 'app/shared/button-group/button-group.html'
			}
		});
})();
