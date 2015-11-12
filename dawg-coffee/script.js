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

	$scope.saveItem = function(item, quantity, blend){
		var quantityCurrent = $scope.quantities.indexOf(quantity) + 1;
		var costCurrent = quantityCurrent * item.price;
		var grindIndex = $scope.blends.indexOf(blend);
		var grindCurrent = $scope.blends[grindIndex];
		cartService.saveItem(item, quantityCurrent, grindCurrent, costCurrent);
		console.log("saving beans");
		$scope.quantity = 1;
		$scope.blend = "Whole Bean";

	}


}])

.controller('cartCtrl', ['$scope', '$http', 'cartService', function($scope, $http, cartService){
	$scope.currentCart = cartService.list;

	$scope.add = function(num){
		$scope.itemNum = $scope.currentCart[num];
		if($scope.itemNum.amount < 11){
			$scope.itemNum.amount++;
			$scope.itemNum.cost = $scope.itemNum.cost + $scope.itemNum.bean.price;
			cartService.updateStorage();
		}
	}
	$scope.subtract = function(num){
		$scope.itemNum = $scope.currentCart[num];
		if($scope.itemNum.amount > 1){
			$scope.itemNum.amount--;
			$scope.itemNum.cost = $scope.itemNum.cost - $scope.itemNum.bean.price;
			cartService.updateStorage();
		}
	}
	$scope.total = function(){
		var totalCount = 0;
		for(var i=0; i < $scope.currentCart.length; i++){
			totalCount = totalCount + $scope.currentCart[i].cost;
		}
		console.log(totalCount);
		return totalCount;
	}
	$scope.remove = function(num){
		$scope.currentCart.splice(num, 1);
		cartService.updateStorage();
		console.log("remove before total");
		$scope.totally = $scope.total();
	}
	$scope.submit = function(){
		console.log("order submitted");
		window.alert("order submitted");
		cartService.list=[];
		cartService.updateStorage();
		$scope.totally = $scope.total();
		location.reload();

	}

	$scope.totally = $scope.total();

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

	currentCart.updateStorage = function(){
		localStorage.setItem("saveCart", angular.toJson(currentCart.list));
		console.log("removed");
	}

	return currentCart;
})