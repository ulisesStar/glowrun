app.controller('adminCtrl', function ($scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav) {

    $scope.productos = [];

    $scope.secciones = [
        {
            nombre: 'home',
            state: 'home',
			icon: 'home'
        }, {
            nombre: 'ciudades',
            state: 'ciudades',
            icon: 'location_city'
        },
        {
            nombre: 'carreras',
            state: 'carreras',
            icon: 'flag'
        },
        {
            nombre: 'patrocinadores',
            state: 'patrocinadores',
            icon: 'extension'
        },
        {
            nombre: 'usuarios',
            state: 'usuarios',
            icon: 'account_box'
        },
        {
            nombre: 'ordenes',
            state: 'ordenes',
            icon: 'account_balance_wallet'
        }
    ];

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.Dropify = function() {
        $('.dropify').dropify({
            messages: {
                default: 'Agregar',
                replace: 'Reemplazar',
                remove: 'Eliminar',
                error: 'Error'
            }
        });
    };

    $('.dropify').dropify();

});
