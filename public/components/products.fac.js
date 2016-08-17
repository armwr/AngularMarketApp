(function() {

	"use strict"
	angular
	.module('ngProducts')
	.factory('productsFactory', function($http){

		function getProducts() {
			return $http.get('mock/data.json');
		}
		
		return {
			getProducts: getProducts
		}


	})
})()		