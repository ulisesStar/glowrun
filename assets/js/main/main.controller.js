app.controller('mainCtrl', function ($scope, $rootScope, $http, $state,  $mdDialog,mdDialog, AuthService, $localStorage) {

    $localStorage.usuario = false;
    $localStorage.interes = false;

	$scope.mdDialogmenu = function(){
		mdDialog.mostrardialog('menu', 'mainCtrl', $scope.customFullscreen);
	}

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.registro = function(usuario){
        AuthService.registro(usuario);
    }

    $scope.login = function(x){
        AuthService.login(x);
        console.log(x);
    }

    $scope.interes = function(carrera){
        $scope.iniciosesion();
    }

    var self = this;
    self.simulateQuery = false;
    self.isDisabled = false;

    self.repos = [];

    self.querySearch = querySearch;

    function querySearch(query) {
        var results = query
                ? self.repos.filter(createFilterFor(query))
                : self.repos,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    self.searchTextChange = searchTextChange;
    self.selectedItemChange = selectedItemChange;

    function searchTextChange(text) {}
    function selectedItemChange(item) {}

    $scope.iniciosesion = function (ev) {
        mdDialog.mostrardialog('login', 'mainCtrl', $scope.customFullscreen);
    };

    $scope.registrarse = function() {
        mdDialog.mostrardialog('registro', 'mainCtrl', $scope.customFullscreen);
    }

    $scope.botones = [{
        title: 'Home',
        icon: 'whatshot',
        color: 'red',
        sref: 'home'
    }, {
        title: 'Yellow',
        icon: 'flash_on',
        color: 'yellow',
        sref: 'yellow'
    }, {
        title: 'Purple',
        icon: 'public',
        color: 'purple',
        sref: 'purple'
    }, {
        title: 'Blue',
        icon: 'filter_hdr',
        color: 'blue',
        sref: 'blue'
    }, {
        title: 'Green',
        icon: 'nature',
        color: 'green',
        sref: 'green'
    }];


    // Slider



    //
    // $http.get('/data/dataImagen').then(function (data) {
    //     $scope.imagenes = data.data;
    //     console.log(data.data);
    // });


});
