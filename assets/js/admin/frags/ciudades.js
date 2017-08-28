var app = angular.module('myapp');

app.controller('ciudadCtrl', function ($scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav, Ciudades) {

    $scope.ciudades = [];

    $scope.dialogCiudad = function(){
        mdDialog.mostrardialog('nuevaciudad', 'ciudadCtrl', $scope.customFullscreen);
    }

    $scope.obtenerCiudades = function(data){
        Ciudades.obtenerCiudades().then(function(data){
            $scope.ciudades = data;
            console.log($scope.ciudades)
        })
    }

    $scope.crearCiudad = function(data){
        Ciudades.crearCiudad(data, function(data){
            let ciudad = data.data
            console.log(ciudad);
            $scope.ciudades.push(ciudad);

        })
    }

});
