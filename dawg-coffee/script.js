'use strict';

angular.module('CoffeeApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])
.config(function($stateProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html'
		})
		.state('orders', {
			url: '/orders',
			templateUrl: 'partials/order.html',
			controller: 'orderCtrl'
		})
		.state('details', {
			url: '/orders/details',
			templateUrl: 'partials/details.html',
			controller: 'detailsCtrl'
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'partials/cart.html',
			controller: 'cartCtrl'
		})
})

.controller('orderCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('data/products.json').then(function(response){
		$scope.products = response.data;
	});

	$scope.search = '';

}])

.controller('detailsCtrl', ['$scope','$http', function($scope, $http){

	$http.get('data/products.json').then(function(response){
		$scope.products = response.data;
	});

}])



.factory('cartService', function(){
	var currentCart = {};

	currentCart.list = [];
	currentCart.saveItem = function(item, num){
		console.log("saving item");
		var itemFinal = {};
		itemFinal.bean = item;
		itemFinal.amound = num;
		currentCart.list.push(itemFinal);
	}

	return currentCart;
})