var app = angular.module('app', ['ngRoute']);
var user_login = sessionStorage.getItem('user_login') ? angular.fromJson(sessionStorage.getItem('user_login')) : [];
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "./page/home.html"
        }).when('/cart', {
            templateUrl: "./page/cart.html"
        });
});

app.controller('mainCtrl', function($scope, $location, $http) {
    var data_url = "./data/products.json";

    $http.get(data_url).then(function(res) {
        $scope.products = res.data;
    });

    $scope.carts = localStorage.carts ? angular.fromJson(localStorage.carts) : [];
    $scope.total_amount = parseInt(localStorage.total_amount ? localStorage.total_amount : 0);

    $scope.xem = function(product) {
        $scope.showProduct = product;
        $("#modal-show").modal();
    };

    $scope.them = function(product) {
        $scope.carts.push(product);
        localStorage.carts = angular.toJson($scope.carts);
		
        $scope.total_amount += product.price;
        localStorage.total_amount = $scope.total_amount;
    };

    $scope.xoa = function() {
        $scope.carts = [];
        localStorage.carts = angular.toJson($scope.carts);

        $scope.total_amount = 0;
		localStorage.total_amount = $scope.total_amount;
    };
})