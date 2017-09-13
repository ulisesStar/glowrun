var app = angular.module('myapp');

app.controller('ordenesCtrl', function ($scope, $rootScope, $filter, $mdDialog,mdDialog, $localStorage,$timeout, $mdSidenav, Orden, Usuario) {

	var idUsuario = $localStorage.id.id;

	Usuario.obtener(idUsuario).then(function(data){
		$scope.usuario = data;
		console.log(data);
	})

	console.log($scope.usuario);

    Orden.obtenerOne(idUsuario).then(function(data){
        $scope.ordenes = data;

        console.log(data);

    })


});
