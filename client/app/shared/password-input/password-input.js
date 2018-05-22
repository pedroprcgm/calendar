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
                },
				templateUrl: 'app/shared/password-input/password-input.html'
			}
		});
})();
