var app = angular.module('myapp', [
    'ngMaterial',
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'oc.lazyLoad',
    'naif.base64',
    'ngVimeo',
	'md.data.table',
	'uiGmapgoogle-maps'
]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('deep-purple').accentPalette('orange')
});

app.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);


app.run(function($rootScope, $transitions, $state) {
    $transitions.onStart({}, trans => {

    });

    $transitions.onSuccess({}, trans => {

    });
})

app.service('mdDialog', function($mdDialog) {

    this.mostrardialog = function(template, DialogController, tamanioPantalla, ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/partials/' + template,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: tamanioPantalla
        }).then(function(answer) {
            console.log(template);
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.personalizable = function(answer) {
            $mdDialog.hide(answer);
            //OCULTA Y HAZ ALGO
        };
    }
});

app.directive('slider', function($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        link: function(scope, elem, attrs) {

            scope.currentIndex = 0;

            scope.next = function() {
                scope.currentIndex < scope.images.length - 1
                    ? scope.currentIndex++
                    : scope.currentIndex = 0;
            };

            scope.prev = function() {
                scope.currentIndex > 0
                    ? scope.currentIndex--
                    : scope.currentIndex = scope.images.length - 1;
            };

            scope.$watch('currentIndex', function() {
                scope.images.forEach(function(image) {
                    image.visible = false;
                });
                scope.images[scope.currentIndex].visible = true;
            });

            /* Start: For Automatic slideshow*/

            var timer;

            var sliderFunc = function() {
                timer = $timeout(function() {
                    scope.next();
                    timer = $timeout(sliderFunc, 1500);
                }, 1500);
            };

            sliderFunc();

            scope.$on('$destroy', function() {
                $timeout.cancel(timer);
            });

            /* End : For Automatic slideshow*/
        },
        templateUrl: '/partials/slider'
    };
});

app.factory('AuthService', function($window, $http, Session, Token, $localStorage, alertas, $state, $q) {

    var authService = {};

    var deferred = $q.defer();

    authService.registro = function(credentials) {

        $http.post('/data/registro', credentials).success(function(data) {
            console.log(data);

            $http.post('/conekta/usuario', {
                'nombre': data.user.nombre,
                'correo': data.user.correo
            }).then(function(datos) {
                console.log(datos);
                // $window.location.href = "/user";
                $localStorage.auth = true;
				alertas.mostrarToastEstandar("Usuario registrado");
	            Session.create(data.user);
				Token.create(data.token);
                $window.location.href = "/user" + data.token;
            })

        }).error(function(err) {
            alertas.mostrarToastEstandar("No se pudo registrar");
            console.log(err);
        });

    };

    authService.login = function(credentials) {
        $http.post('/data/login', credentials)
            .success(function(data) {
            console.log(data);

            if (data.user) {
                Session.create(data.user);
                Token.create(data.token);
                $localStorage.auth = true;
                $window.location.href = "/user" + data.token;
            } else {
                alertas.mostrarToastEstandar("Usuario o contraseña incorrecta");
            }

        }).error(function(data) {
            console.log(data);
        })

    };

    authService.set = function(data) {
        token = {
            token: data
        }
        $http.post('/data/token', token)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(err){

        })
        return deferred.promise;

    };

    authService.logout = function() {
        Session.destroy();

    };

    authService.update = function(user) {
        return $http.post('/user/update', user).then(function(resp) {
            if (resp.status === 200) {
                Session.create(resp.data);
            }
            return resp;
        });
    };

    return authService;
});


app.service('Token', function($localStorage, $q) {


    var deferred = $q.defer();

    this.create = function(data) {
        $localStorage.$reset();
        // $localStorage.accessToken = user.access_token;
        $localStorage.token = data;
    };

    this.obtener = function(data) {

        token = $localStorage.token
        deferred.resolve(token);

        return deferred.promise;
    };

    this.setadd = function(data) {

        $localStorage.token = data;


    };

    this.destroy = function() {
        $localStorage.$reset();
    };
});


app.service('Session', function($localStorage) {
    this.create = function(data) {
        $localStorage.$reset();
        // $localStorage.accessToken = user.access_token;
        $localStorage.usuario = data;
    };

    this.destroy = function() {
        $localStorage.$reset();
    };
});

app.service('alertas', [
    '$mdToast',
    function($mdToast) {
        this.mostrarToastEstandar = function(mensaje) {
            var last = {
                bottom: true,
                top: false,
                left: false,
                right: true
            };

            var toastPosition = angular.extend({}, last);

            function getToastPosition() {
                sanitizePosition();

                return Object.keys(toastPosition).filter(function(pos) {
                    return toastPosition[pos];
                }).join(' ');
            };

            function sanitizePosition() {
                var current = toastPosition;

                if (current.bottom && last.top)
                    current.top = false;
                if (current.top && last.bottom)
                    current.bottom = false;
                if (current.right && last.left)
                    current.left = false;
                if (current.left && last.right)
                    current.right = false;

                last = angular.extend({}, current);
            }

            var pinTo = getToastPosition();

            $mdToast.show($mdToast.simple().textContent(mensaje).position(pinTo).theme('green').hideDelay(3000));
        }
    }
]);
