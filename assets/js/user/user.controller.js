app.controller('userCtrl', function($window, $scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav, $localStorage, Pagos, AuthService) {

    $scope.secciones = [
        {
            nombre: 'home',
            state: 'home'
        },
        {
            nombre: 'perfil',
            state: 'perfil'
        }, {
            nombre: 'Pagos',
            state: 'pagos'
        }
    ];

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

});
