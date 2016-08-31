(function() {

	"use strict"
	
	angular
	.module('ngProducts')
	.controller('productsCtrl', productsCtrl) 


	function productsCtrl ($scope, $http, $mdSidenav, $mdToast, $mdDialog) { 

		var vm = this;

		vm.openSidebar = openSidebar;
		vm.closeSidebar = closeSidebar;
		vm.saveProduct = saveProduct;
		vm.editProduct = editProduct;
		vm.saveEdit = saveEdit;
		vm.deleteProduct = deleteProduct;
		vm.getProducts = getProducts;

		vm.product;
		vm.products;
		vm.categories;
		vm.editing;


		var contact = {
			name: "Lysenko Volodymyr",
			number: "(555) 555-5555",
			email: 'armwr91@gmail.com'
		}

		function openSidebar() {
			$mdSidenav('left').open();
		}

		function closeSidebar() {
			$mdSidenav('left').close();
		}

		function editProduct(product) {
			$scope.editing = true;
			openSidebar();
			$scope.product = product;
		}



		function showToast(message) {
			$mdToast.show (
				$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
				);
		}

		$scope.product = {};


    //GET
    function getProducts() {
    	$http.get('/api/products').success(function(response) {
    		console.log("I've got products")
    		$scope.products = response;
    	})
    }

    getProducts();

    //POST
    function saveProduct() {

    	console.log($scope.product);

    	$http.post('/api/products', $scope.product).success(function(response) {
    		$scope.product = {};
    		showToast('Product ' + $scope.product._id + ' has been created!')
    		getProducts();
    	})

    	closeSidebar();

    }; 

    //DELETE
    function deleteProduct(id) {

    	var confirm = $mdDialog.confirm()
    	.title('Are you sure you want to delete ?')
    	.ok('Yes')
    	.cancel('No')
    	.targetEvent(event);
    	$mdDialog.show(confirm).then(function() {

    		$http.delete('/api/products/' + id).success(function(response) {
    			getProducts();
    			console.log('Product ' + $scope.product._id + ' has been deleted!')
    		})

    	},function() {})

    };

    //UPDATE
    function saveEdit(id) {

    	console.log('Product ' + $scope.product._id + ' has been edited!');

    	$http.put('/api/products/' + $scope.product._id, $scope.product).success(function(data) {
    		$scope.product = {};
    		getProducts();
    	})


    	closeSidebar();
    	showToast('Edit saved');
    }


}

})()