(function() {
	angular
	.module('ngProducts', ['ngMaterial','ui.router', 'ngCookies'])
	.run(function($rootScope, $cookies) {
		if($cookies.get('token') && $cookies.get('currentUser')) {
			$rootScope.token = $cookies.get('token');
			$rootScope.currentUser = $cookies.get('currentUser');
		}
	})
	.config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {

		$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('orange');


		$stateProvider
		.state('signin', {
			url:'/signin',
			templateUrl: '/components/signin.tpl.html',
			controller: 'productsCtrl as vm'
		})
		.state('products', {
			url:'/products',
			templateUrl: '/components/products.tpl.html',
			controller: 'productsCtrl as vm'
		})
		.state('signup', {
			url:'/signup',
			templateUrl: '/components/signup.tpl.html',
			controller: 'productsCtrl as vm'
		})
		$urlRouterProvider.otherwise("/signin");

	})
})()
