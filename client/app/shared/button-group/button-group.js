(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('buttonGroup', function($location) {			
			return {
			    restrict: 'E',
			    scope: {
                    formId: '@?',
                    primaryMessage: '@',
                    primaryAction: '&',
                    secondary: '=?',
                    secondaryMessage: '@?',
                    secondaryAction: '=?',
                    delete: '=?',
                    deleteAction: '=?'
                },
                controller: function($scope){
                    $scope.secondaryWrapper = () => {
                        if($scope.secondaryAction){
                            $scope.secondaryAction();
                        } else {
                            _cancel();
                        }
                    };

                    $scope.deleteActionWrapper = () => {
                        if($scope.deleteAction){
                            $scope.deleteAction();
                        }
                    };

                    const _cancel = () => $location.path('/')

                },
				templateUrl: 'app/shared/button-group/button-group.html'
			}
		});
})();
