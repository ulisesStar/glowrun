var app = angular.module('myapp');

app.controller('ordenesCtrl', function ($scope, $rootScope, $filter, $mdDialog,mdDialog, $timeout, $mdSidenav, Orden) {



    Orden.obtenerOne($scope.usuario.id).then(function(data){
        $scope.ordenes = data;

        console.log(data);

    })


});
