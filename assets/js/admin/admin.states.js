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
				templateUrl: '/admin/home'
			}
		}
	})
	.state('ciudades', {
		url: '/ciudades',
		views: {
			'main': {
				templateUrl: '/admin/lista_ciudades',
				controller: 'ciudadCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminCiudades']);
                }
            ]
        }
	})
	.state('carreras', {
		url: '/carreras',
		views: {
			'main': {
				templateUrl: '/admin/lista_carreras',
				controller: 'carreraCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminCarreras']);
                }
            ]
        }
	})

	.state('carrera', {
		url: '/carrera/:idCarrera',
		views: {
			'main': {
				templateUrl: '/admin/carrera',
				controller: 'carreraCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminCarreras']);
                }
            ]
        }
	}).
	state('crearCarrera', {
		url: '/crearCarrera',
		views: {
			'main': {
				templateUrl: '/admin/crear_carrera',
				controller: 'carreraCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminCarreras']);
                }
            ]
        }
	})
	.state('patrocinadores', {
		url: '/patrocinadores',
		views: {
			'main': {
				templateUrl: '/admin/lista_patrocinadores',
				controller: 'patrocinadoresCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminPatrocinadores']);
                }
            ]
        }
	})
	.state('patrocinador', {
		url: '/patrocinador',
		params: {
			'patrocinador' : null
		},
		views: {
			'main': {
				templateUrl: '/admin/patrocinador',
				controller: 'patrocinadoresCtrl as ctrl'
			}
		},
		resolve: {
			loadMyCtrl: [
				'$ocLazyLoad',
				function($ocLazyLoad) {
					return $ocLazyLoad.load(['ozAdminPatrocinadores']);
				}
			]
		}
	})
	.state('crearPatrocinador', {
		url: '/crearPatrocinador',
		views: {
			'main': {
				templateUrl: '/admin/crear_patrocinador',
				controller: 'patrocinadoresCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminPatrocinadores']);
                }
            ]
        }
	})
	.state('usuarios', {
		url: '/usuarios',
		views: {
			'main': {
				templateUrl: '/admin/lista_usuarios',
				controller: 'usuariosCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminUsuarios']);
                }
            ]
        }
	})
	.state('usuario', {
		url: '/usuario/:idUsuario',
		views: {
			'main': {
				templateUrl: '/admin/usuario',
				controller: 'usuariosCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminUsuarios']);
                }
            ]
        }
	})
	.state('ordenes', {
		url: '/ordenes',
		views: {
			'main': {
				templateUrl: '/admin/lista_ordenes',
				controller: 'ordenCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozAdminOrden']);
                }
            ]
        }
	})
}]);
