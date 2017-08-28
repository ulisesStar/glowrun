var app = angular.module('myapp');

app.controller('carrerasCtrl', function ($scope, $rootScope, $filter, $mdDialog,mdDialog, $timeout, $mdSidenav, $state, $stateParams, Ciudades, Carreras, Imagenes) {

    $scope.carreras, $scope.ciudades, $scope.imagenes, $scope.proximos, $scope.anteriores = [];

    $scope.proximos = [];
    $scope.anteriores = [];

    $scope.loading = true;

    Carreras.obtenerCarrerasconPortada().then(function(data){

        data.forEach(function(carrera){

            let fecha = formato(carrera.fecha)

            if(fecha > fechaactual){

                $scope.proximos.push(carrera);
            }else{
                $scope.anteriores.push(carrera);
            }


        })

        $scope.loading = false;

    })

    Ciudades.obtenerCiudades().then(function(data){
        $scope.ciudades = data;
    })

    $scope.fechaActual =  new Date();
    var fechaactual = formato($scope.fechaActual);

    $scope.irCarrera = function(carrera){
		console.log(carrera);
        $state.go('carrera', { carrera: carrera});
    }

    function formato(x){
        var n =  $filter('date')(x,"MMM dd yyyy - HH:mm:ss");
        return n;
    }

});
