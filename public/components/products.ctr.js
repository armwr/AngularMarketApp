(function() {

	"use strict"
	
	angular
	.module('ngProducts')
	.controller('productsCtrl', productsCtrl) 


	function productsCtrl ($scope, $http, $mdSidenav, $mdToast, $mdDialog){ 

		var vm = this;

		vm.openSidebar = openSidebar;
		vm.closeSidebar = closeSidebar;
		vm.saveProduct = saveProduct;
		vm.editProduct = editProduct;
		vm.saveEdit = saveEdit;
		vm.deleteProduct = deleteProduct;

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

		vm.product = {};


    // when landing on the page, get all products and show them
    $http.get('/api/products')
    .success(function(data) {
    	$scope.products = data;
    	console.log(data);
    	console.log("I've got data");
    })
    .error(function(data) {
    	console.log('Error: ' + data);
    });


    // delete a todo after checking it
    function deleteProduct(id) {
    	var confirm = $mdDialog.confirm()
    	.title('Are you sure you want to delete ?')
    	.ok('Yes')
    	.cancel('No')
    	.targetEvent(event);
    	$mdDialog.show(confirm).then(function() {

    		$http.delete('/api/products/' + id)
    		.success(function(data) {
    			$scope.products = data;
    			console.log(data);
    		})
    		.error(function(data) {
    			console.log('Error: ' + data);
    		});

    	},function() {})

    };

    //when submitting the add form, send the text to the node API
    function saveProduct() {

    	$http.post('/api/products', $scope.product)
    	.success(function(data) {
                $scope.product = {}; // clear the form so our user is ready to enter another
                $scope.products = data;
                console.log(data);
            })
    	.error(function(data) {
    		console.log('Error: ' + data);
    	});

    	closeSidebar();
    	showToast('Product saved!')

    }; 

    function saveEdit(id) {
    	$scope.editing = false;

    	$http.update('/api/products', $scope.product)
    	.success(function(data) {
                $scope.product = {}; // clear the form so our user is ready to enter another
                $scope.products = data;
                console.log(data);
            })
    	.error(function(data) {
    		console.log('Error: ' + data);
    	});


    	$scope.product = {};
    	closeSidebar();
    	showToast('Edit saved');
    }

}
})()