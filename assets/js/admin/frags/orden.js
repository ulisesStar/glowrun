var app = angular.module('myapp');

app.controller('ordenCtrl', function ($scope, $rootScope, $filter, $mdDialog,mdDialog, $timeout, $mdSidenav, $state, $stateParams, Orden) {

    $scope.obtenerOrdenes = function(){

    	console.log('se estan obteniendo las ordenes');

        Orden.obtener().then(function(data){

			console.log('se obtuvieron las ordenes');

            $scope.ordenes = data;

        })

    }

});
