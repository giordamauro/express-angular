var app = angular.module("mgApp", []);

app.controller("getUsers", function($scope, $http) {
    $http.get('/api/users').
        success(function(users) {
            $scope.users = users;
        });
});