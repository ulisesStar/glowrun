app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', {
		url: '/',
		views: {
			'main': {
				templateUrl: '/user/frags/home',
				controller: 'homeCtrl as ctrl'
			}
		},
        resolve: {
			check: function($window, Token, AuthService, $localStorage){

				var url = $window.location.pathname;
				var das = url.split('/user');
				Token.setadd(das[1])
				AuthService.set(das[1]).then(function(data){
					$localStorage.id = data;
				})
			},
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozUserHome']);
                }
            ]
        }
	})
	.state('perfil', {
		url: '/perfil',
		views: {
			'main': {
				templateUrl: '/user/frags/profile'
			}
		}
	})
	.state('crearOrden', {
		url: '/crearOrden',
		params: {
			'carrera' : null
		},
		views: {
			'main': {
				templateUrl: '/user/frags/crearOrden',
				controller: 'ordenCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozUserOrden']);
                }
            ]
        }
	})
	.state('pagos', {
		url: '/pagos',
		views: {
			'main': {
				templateUrl: '/user/frags/payment',
				controller: 'ordenesCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozUserOrdenes']);
                }
            ]
        }
	})
}]);
