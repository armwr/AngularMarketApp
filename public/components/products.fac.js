(function() {

	"use strict"
	angular
	.module('ngProducts')
	.factory('productsFactory', function($http){

		function getNewProducts() {
			return $http.get('mock/data.json');
		}
		
		return {
			getNewProducts: getNewProducts
		}


	})
})()		