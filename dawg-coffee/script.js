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
			url: '/orders/{id}',
			templateUrl: 'partials/details.html',
			controller: 'detailsCtrl'
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'partials/cart.html',
			controller: 'cartCtrl'
		})
})

.controller('orderCtrl', ['$scope', '$http', 'cartService', function($scope, $http, cartService){

	$http.get('data/products.json').then(function(response){
		$scope.products = response.data;
	});

}])

.controller('detailsCtrl', ['$scope','$http', '$stateParams', '$filter', 'cartService', function($scope, $http, $stateParams, $filter, cartService){
	$scope.currentCart = cartService.list;

	$scope.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	$scope.quantity = 1;

	$scope.blends = ["Whole Bean", "Espresso", "French Press", "Cone Drip Filter", "Flat Bottom Filter"];
	$scope.blend = "Whole Bean";

	$http.get('data/products.json').then(function(response){
		$scope.item = $filter('filter')(response.data, {
			id: $stateParams.id
		}, true)[0];
	});

	$scope.saveItem = function(item, quantity, grind){
		item.quantity = $scope.quantities.indexOf(quantity);
		var tempCost = item.price * quantity;
		cartService.saveItem(item, quantity, grind, tempCost);
		console.log("saving beans");
	}


}])

.controller('cartCtrl', ['$scope', '$http', 'cartService', function($scope, $http, cartService){
	$scope.currentCart = cartService.list;

	$scope.add = function(num){
		if(currentCart[num].quantity < 11){
			currentCart[num].quantity++;
			cartService.updateStorage();
		}
	}
	$scope.subtract = function(num){
		if(currentCart[num].quantity>1){
			currentCart[num].quantity--;
			cartService.updateStorage();
		}
	}
	$scope.total = function(){
		var totalCount = 0;
		for(var i=0; i <currentCart.length; i++){
			totalCount = totalCount + currentCart[i].quantity;
		}
		return totalCount;
	}
	$scope.remove = function(num){
		currentCart.splice(num, 1);
		cartService.updateStorage();
		total();
	}
	$scope.submit = function(){
		console.log("order submitted");
		window.alert("order submitted");
		currentCart = [];

	}
}])

.factory('cartService', function(){
	var currentCart = {};
	currentCart.list = [];
	if(localStorage.getItem('saveCart')){
		currentCart.list = JSON.parse(localStorage.getItem('saveCart'));
	}

	currentCart.saveItem = function(item, quantity, grind, cost){
		console.log("saving item");
		var itemFinal = {};
		itemFinal.bean = item;
		itemFinal.amount = quantity;
		itemFinal.grind = grind;
		itemFinal.cost = cost;
		currentCart.list.push(itemFinal);
		localStorage.setItem("saveCart", angular.toJson(currentCart.list));
	};

	var updateStorage = function(){
		localStorage.setItem("saveCart", angular.toJson(currentCart.list));
	}

	return currentCart;
})