app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug: true,
        modules: [
            {
                name: 'ozAdminCiudades',
                files: ['js/admin/frags/ciudades.js'],
				 cache: false
            },
            {
                name: 'ozAdminCarreras',
                files: ['js/admin/frags/carreras.js']
            },
            {
                name: 'ozAdminPatrocinadores',
                files: ['js/admin/frags/patrocinadores.js']
            },
            {
                name: 'ozAdminUsuarios',
                files: ['js/admin/frags/usuarios.js']
            },
            {
                name: 'ozHome',
                files: ['js/main/frags/home.js']
            },
            {
                name: 'ozMainCarreras',
                files: ['js/main/frags/carreras.js'],
                rerun: true,
            },
			{
				name: 'ozMainCarrera',
				files: ['js/main/frags/carrera.js'],
				rerun: true,
			},
            {
                name: 'ozUserHome',
                files: ['js/user/frags/home.js']
            },
			{
                name: 'ozUserOrden',
                files: ['js/user/frags/orden.js']
            },
			{
                name: 'ozUserOrdenes',
                files: ['js/user/frags/ordenes.js']
            },
			{
                name: 'ozAdminOrden',
                files: ['js/admin/frags/orden.js']
            },

        ]
    });
}]);
