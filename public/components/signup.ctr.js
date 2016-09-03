// (function() {

// 	"use strict"
	
// 	angular
// 	.module('ngProducts')
// 	.controller('signupCtrl', signupCtrl) 

// 	function signupCtrl($scope, $http, $cookies) {

// 		$scope.submitSignup = function() {
// 			var newUser = {
// 				username: $scope.username,
// 				password: $scope.password
// 			}

// 			$http.post('/users', newUser).then(function() {
// 				alert('success');
// 			})
// 		}

// 	}

// })();