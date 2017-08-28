var app = angular.module('myapp');

app.controller('carreraCtrl', function ($scope, $rootScope, $http, $mdDialog,mdDialog, $timeout, $mdSidenav, $state, $stateParams, Ciudades, Carreras, Imagenes) {

    $scope.carreras, $scope.ciudades, $scope.imagenes = [];

    $scope.obtenerCarrera = function(){

        var idCarrera = $stateParams.idCarrera;

        $scope.editar = false;

        console.log(idCarrera);

        Carreras.obtenerCarrera(idCarrera).then(function(data){
            $scope.carrera = data;
            console.log(data);
        })
    }

    $scope.actualizarCarrera = function(id, carrera){
        Carreras.actualizar(id, carrera).then(function(data){
            $scope.carrera = data;
            console.log(data);
        })
    }

    $scope.obtenerCiudades = function(data){
        Ciudades.obtenerCiudades().then(function(data){
            $scope.ciudades = data;
            console.log($scope.ciudades)
        })
    }

    $scope.obtenerCarreras = function(data){
        Carreras.obtenerCarreras().then(function(data){
            $scope.carreras = data;
            console.log($scope.carreras)
        })
    }

    $scope.crearCarrera = function(data){
        Carreras.crearCarrera(data, function(data){
            $scope.carreracreada = data.data;
        })
    }

    $scope.obtenerImagenes = function(id){

        var idCarrera = $stateParams.idCarrera;

        Imagenes.obtenerImagenes(idCarrera).then(function(data){
            $scope.imagenes = data;
            console.log(data);
        })
    }

    $scope.crearImagen = function(data){

        var idCarrera = $stateParams.idCarrera;

        let imagen = { imagen: 'data:image/png;base64,' + data , portada: 0}

        Imagenes.crearImagen(imagen, idCarrera).then(function(x){

            console.log(x);

        })
    }

    $scope.eliminarImagen = function(index, id){

            ventana = $mdDialog.confirm()
            .title('¿Seguro que quieres eliminar la imagen?')
            // .textContent('Dale Aceptar para imprimir o Cerrar para no hacerlo')
            .ok('Aceptar')
            .cancel('Cerrar')
            .clickOutsideToClose(true);

            $mdDialog.show(ventana).then(function() {

                Imagenes.eliminarImagen(id).then(function(data){
                    console.log(data)
                    $scope.imagenes.splice(index);
                })

            }, function() {

            });
    }

    $scope.actualizarPortada = function(carrera , id){

        Imagenes.portada(carrera , id).then(function(data){
        })
    }

});
