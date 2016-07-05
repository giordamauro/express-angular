var app = angular.module("mgApp", []);

// Controllers;

app.controller("UserController", function($scope, $http) {
     
    $scope.readUsers = function() {
    	$scope.users = [{"_id": 123456, "firstName": "Mauro", "lastName": "Giorda", "age": 28, "gender": "M"}, {"_id": 654321, "firstName": "Jane", "lastName": "Doe", "age": 30, "gender": "F"}];
	};

	$scope.createUser = function(name, lastname, gender, age) {
    	alert('created!');
  	};

	$scope.updateUser = function(name, lastname, gender, age) {
    	alert('updated!');
  	};

    $scope.deleteUser = function() {
    	alert('deleted user" + $scope.selectedUser._id + "!');
  	};

  	// Events:

	$scope.onRowClicked = function(tableRow, row) {

		$scope.selectedRow = row; 
		$scope.selectedUser =  {};
		$scope.selectedUser.firstName = tableRow.user.firstName;
		$scope.selectedUser.lastName = tableRow.user.lastName;
		$scope.selectedUser.gender = tableRow.user.gender;
		$scope.selectedUser.age = tableRow.user.age;
	};
});

// Directives;

app.directive('ngConfirmClick', [
  function(){
  	return {
    	link: function (scope, element, attr) {
        	var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click',function (event) {
            	if ( window.confirm(msg) ) {
              		scope.$eval(clickAction)
            	}
        	});
    	}
	};
}])