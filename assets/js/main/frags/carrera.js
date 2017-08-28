var app = angular.module('myapp');

app.controller('carreraCtrl', function ($scope, $rootScope, $filter, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Carreras) {

    $scope.fechaActual =  new Date();

	console.log($scope.carrera);

    var fechaactual = formato($scope.fechaActual)

    var id = $stateParams.carrera.id;

    console.log(id);

    Carreras.obtener(id).then(function(data){

        $scope.carrera = data;

        console.log(data);

        $scope.vimeoConfig = {
            videoId: data.video,
        };

        let fecha = formato(data.fecha)

        if(fecha > fechaactual){

            $scope.status = 'proximo';
        }else{
            $scope.status = 'anterior';
        }

    })

    function formato(x){
        var n =  $filter('date')(x,"MMM dd yyyy - HH:mm:ss");

        return n;
    }

});
