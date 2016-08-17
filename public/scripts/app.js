angular
	.module('ngProducts', ['ngMaterial','ui.router'])
	.config(function ($mdThemingProvider, $stateProvider) {

		$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('orange');

		$stateProvider
		.state('products', {
			url:'/products',
			templateUrl: '/components/products.tpl.html',
			controller: 'productsCtrl as vm'
		})

	})