var app = angular.module("mgApp", []);

// Controllers;

app.controller("UserController", function($scope, $http) {
     
    $scope.readUsers = function() {

      $http.get('/api/users')
        .success(function(users) {
            $scope.selectedRow = -1;
            $scope.selectedUser =  null;
            
            $scope.users = users;
        })
        .error(function(err) {
          alert('Error getting users - ' + JSON.stringify(err));
        });
	};

	$scope.createUser = function(name, lastname, gender, age) {
    	
      var userGender = gender ? gender : "M";

      var userData = {};
      userData.firstName = name;
      userData.lastName = lastname;
      userData.gender = userGender;
      userData.age = age;

      $http.post('/api/users', userData)
        .success(function(user) {
          $scope.readUsers();
      })
      .error(function(err) {
        alert('Error creating user - ' + JSON.stringify(err));
      });
  };

  $scope.readUserById = function() {
    var userId = $scope.searchUserId;
    if((''+ userId).length == 24) {

      $http.get('/api/users/' + $scope.searchUserId)
          .success(function(user) {
              $scope.selectedRow = 0;
              $scope.selectedUser =  user;
              
              $scope.users = [user];
          })
          .error(function(err) {
              alert("User not found");
          });
    }
  };

	$scope.updateUser = function(gender) {

      $scope.selectedUser.gender = gender;
      var userId = $scope.selectedUser._id;

      $http.put('/api/users/' + userId, $scope.selectedUser)
        .success(function(user) {
          $scope.readUsers();
        })
        .error(function(err) {
          alert('Error updating user - ' + JSON.stringify(err));
        });
  };

  $scope.deleteUser = function() {
    	
      var userId = $scope.selectedUser._id;

      $http.delete('/api/users/' + userId)
        .success(function() {
          $scope.readUsers();
        })
        .error(function(err) {
          alert('Error deleting user - ' + JSON.stringify(err));
        });
  };

  	// Events:

	$scope.onRowClicked = function(tableRow, row) {

		$scope.selectedRow = row; 
		$scope.selectedUser =  {};
		$scope.selectedUser._id = tableRow.user._id;
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