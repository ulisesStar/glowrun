var app = angular.module('myapp');

app.controller('ordenCtrl', function (Usuario, $scope, $localStorage, $rootScope, $filter, $mdDialog,mdDialog, $timeout, $mdSidenav, $state, $stateParams, Pagos, Carreras, Orden) {

    var id = $stateParams.carrera.id;
    var idUsuario = $localStorage.id.id;

    Usuario.obtener(idUsuario).then(function(data){
        $scope.usuario = data;
        console.log(data);
    })

    Carreras.obtenerCarrera(id).then(function(data){
        $scope.carrera = data[0];
    })

    $scope.GenerarOrden = function(tarjeta, usuario, carrera) {

        $scope.procesando = true;

        Pagos.crearToken(tarjeta, usuario.conekta_id).then(function(data) {

            var peticion = {
                tarjeta: data,
                usuario: usuario,
                carrera: carrera
            }

            console.log(peticion);

            Orden.crear(peticion).then(function(data){
				console.log(data);
                $scope.procesando = false;
                $state.go('pagos')

            })

        });
    }

});
