(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('passwordInput', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    customId: '@',
                    label: '@',
                    model: '=',
                    required: '=',
                    confirmPassword: '=',
                    modelConfirmation: '=',
                    placeholder: '@?',
                },
                controller: function($scope){
                    if($scope.confirmation) $scope.passConfirmation = "";
                    
                    $scope.id = $scope.customId 
						? $scope.customId 
						: 'password-input-' + $scope.$id;                     
                },
				templateUrl: 'app/shared/password-input/password-input.html'
			}
		});
})();
