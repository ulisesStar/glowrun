var app = angular.module('myapp');

app.controller('patrocinadoresCtrl', function ($scope, $rootScope, $state, $stateParams, $http, mdDialog, $timeout, $mdSidenav, Patrocinadores, Carreras) {

    $scope.ciudades = [];

    $scope.dialogCiudad = function(){
        mdDialog.mostrardialog('nuevaciudad', 'ciudadCtrl', $scope.customFullscreen);
    }

    $scope.obtenerPatrocinadores = function(data){
        Patrocinadores.obtenerPatrocinadores().then(function(data){
            $scope.patrocinadores = data;
            console.log($scope.patrocinadores)
        })
    }

    Carreras.obtenerCarreras().then(function(data){
        $scope.carreras = data;
    })

    $scope.crearPatrocinador = function(data){

        let patrocinador = {
            nombre: data.nombre,
            imagen: 'data:image/png;base64,' + data.imagen.base64,
            idcarrera: data.idcarrera
        }

        Patrocinadores.crearPatrocinador(patrocinador, function(data){
            let patrocinador = data.data
            console.log(patrocinador);
        })
    }

    $scope.irPatrocinador = function(data){
        $state.go('patrocinador', { patrocinador: data});
    }

    $scope.obtenerPatrocinador = function(){

        var id = $stateParams.patrocinador;

        console.log($stateParams)

        Patrocinadores.obtenerOne(id).then(function(data){
            $scope.patrocinador = data[0];
            console.log(data);

        })

    }

});
