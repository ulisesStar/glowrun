var app = angular.module('myapp');

app.controller('homeCtrl', function (Usuario, $localStorage, $scope, $rootScope, $filter, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Carreras, Token, $location) {

    $scope.proximos = [];
    $scope.anteriores = [];

    var idUsuario = $localStorage.id.id;

    Usuario.obtener(idUsuario).then(function(data){
        $scope.usuario = data;
        console.log(data);
    })

    $scope.fechaActual =  new Date();
    var fechaactual = formato($scope.fechaActual)
    console.log(fechaactual);

    $loadingcarreras = true;

    $scope.obtenerCarreras = function(data){
        Carreras.obtenerCarrerasconPortada().then(function(data){
			console.log(data);
            data.forEach(function(carrera){

                let fecha = formato(carrera.fecha)

                // Esto puede ser un error
                if(fecha < fechaactual){
                    $scope.proximos.push(carrera);
                }else{
                    $scope.anteriores.push(carrera);
                }
            })

            $scope.carreras = data;
            $loadingcarreras = true;

            console.log($scope.proximos);
            console.log($scope.anteriores);
        })
    }

    function formato(x){
        var n =  $filter('date')(x,"MMM dd yyyy - HH:mm:ss");

        return n;
    }

	$scope.mdDialogOrden = function(carrera) {
		mdDialog.mostrardialog('orden', 'homeCtrl', $scope.customFullscreen);
        $scope.carreraseleccionada = carrera;
	}

	$scope.irOrden = function(carrera){
		$state.go('crearOrden', { carrera: carrera});
	}


});
