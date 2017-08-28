var app = angular.module('myapp');

app.controller('usuariosCtrl', function ($scope, $state, $stateParams, $rootScope, $http, mdDialog, $timeout, $mdSidenav, Usuarios) {

    $scope.ciudades = [];

    $scope.obtenerUsuario = function(){
        var id = $stateParams.idUsuario;

        Usuarios.obtenerUno(id).then(function(data){

            console.log(data);

            $scope.usuario = data;

        })
    }

    $scope.obtenerUsuarios = function(){
        Usuarios.obtener().then(function(data){
            $scope.usuarios = data;
        })
    }


});
