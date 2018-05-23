(function() {
    'use strict';

    angular.module('calendarApp').service('authService', function () {

        // TODO
        this.auth = (data) => {
            if(data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                const _token = localStorage.getItem('token');
                const _user = JSON.parse(localStorage.getItem('user'));
                return { token: _token, user: _user};
            }
        }
    })
})();
