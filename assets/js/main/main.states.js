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
				templateUrl: '/main/home',
				controller: 'homeCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozHome']);
                }
            ]
        }
	})

	.state('carreras', {
		url: '/carreras',
		views: {
			'main': {
				templateUrl: '/main/carreras',
				controller: 'carrerasCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozMainCarreras']);
                }
            ]
        }
	})
	.state('carrera', {
		url: '/carrera',
		params: {
			'carrera' : null
		},
		views: {
			'main': {
				templateUrl: '/main/carrera',
				controller: 'carreraCtrl as ctrl'
			}
		},
        resolve: {
			check: function($stateParams){
				console.log($stateParams);
			},
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozMainCarrera']);
                }
            ]
        }
	})
	.state('nosotros', {
		url: '/nosotros',
		views: {
			'main': {
				templateUrl: '/main/nosotros'
			}
		}
	})
	.state('terminosycondiciones', {
		url: '/terminosycondiciones',
		views: {
			'main': {
				templateUrl: '/main/terminosycondiciones'
			}
		}
	});
}]);
