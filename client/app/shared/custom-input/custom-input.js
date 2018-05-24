(function () {
	'use strict';
	angular.module('calendarApp')
		.directive('customInput', function () {
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
				controller: function ($scope) {
					$scope.id = $scope.customId
						? $scope.customId
						: 'custom-input-' + $scope.$id;
				},
				templateUrl: 'app/shared/custom-input/custom-input.html'
			}
		});
})();
