(function() {
	'use strict';
	angular.module('calendarApp')
		.directive('userForm', function() {			
			return {
			    restrict: 'E',
			    scope: {
                    model: '=',
                    onSubmit: '=',
                    withPassword: '=?',
                    delete: '=?',
                    onDelete: '=?'
                },
                controller: function($scope){
                    
                    $scope.action = (event, user) => {
                        if($scope.onSubmit){
                            $scope.onSubmit(event, user);
                        }
                    };

                    $scope.cancel = () => {
                        $location.path('/');
                    };
                },
				templateUrl: 'app/shared/user-form/user-form.html'
			}
		});
})();
