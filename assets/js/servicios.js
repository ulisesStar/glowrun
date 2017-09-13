app.service('Usuario', function($http, alertas, $q) {
    var deferred = $q.defer();
    this.obtener = function(id){

        $http.get('/data/usuario/' + id)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){
            deferred.reject(data);
        })
        return deferred.promise;
    }
});

app.service('Patrocinadores', function($http, alertas, $q) {

    var deferred = $q.defer();

    this.crearPatrocinador = function(data){

        console.log(data);

        $http.post('/data/Patrocinadores', data)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){
            deferred.reject(data);
        })

        return deferred.promise;

    }

    this.obtenerPatrocinadores = function(){
        $http.get('/data/Patrocinadores')
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){
        })

        return deferred.promise;
    }

    this.obtenerOne = function(id){
    $http.get('/data/Patrocinadores/' + id)
    .success(function(data){
        deferred.resolve(data);
    })
    .error(function(data){
    })

    return deferred.promise;
}

});

app.service('Orden', function($http, alertas, $q) {

    var deferred = $q.defer();

    this.crear = function(data){
        $http.post('/data/Orden', data)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;

    }

	this.obtenerOne = function(usuario){

		$http.get('/data/ordenesdeusuario/' + usuario)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(data){

		})

		return deferred.promise;

	}

	this.obtener = function(data){
        $http.get('/data/Orden', data)
        .success(function(data){
            deferred.resolve(data);
            alertas.mostrarToastEstandar("Se ha obtenido las ordenes");

        })
        .error(function(data){

        })

        return deferred.promise;

    }

});

app.service('Usuarios', function($http, alertas, $q) {

    var deferred = $q.defer();

    this.obtener = function(){
        $http.get('/data/usuario')
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;
    }

    this.obtenerUno = function(id){

        $http.get('/data/usuario/' + id)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })
        return deferred.promise;
    }

});


app.service('Ciudades', function($http, alertas, $q) {

    var deferred = $q.defer();

    this.crearCiudad = function(data, callback){
        $http.post('/data/Ciudad', data).then(callback)

    }

    this.obtenerCiudades = function(){
        $http.get('/data/Ciudad')
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;
    }

});

app.service('Carreras', function($http, alertas, $q) {

    var deferred = $q.defer();

    this.crearCarrera = function(data, callback){
        $http.post('/data/Carreras', data).then(callback)

    }


    this.actualizar = function(data){
        $http.put('/data/Carreras/' + data.id, data)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;

    }

    this.obtener = function(id){
		var deferred = $q.defer();
        $http.get('/data/Carreras/' + id)
        .success(function(data){
            console.log(data);
            deferred.resolve(data);
        })
        .error(function(data){
            deferred.reject(data);
        })

        return deferred.promise;
    }

    this.obtenerCarrera = function(id){
		var deferred = $q.defer();
        $http.get('/data/Carreras/' + id)
        .success(function(data){
			console.log(data);
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;
    }


    this.obtenerCarreras = function(){
        $http.get('/data/Carreras')
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;
    }

    this.obtenerCarrerasconPortada = function(){
        $http.get('/data/obtenerCarrerasconPortada')
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;
    }

});

app.service('Imagenes', function($http, alertas, $q) {

    var deferred = $q.defer();

	this.crearImagen = function(data, carrera){
        $http.post('/data/Imagen/' + carrera, data)
        .success(function(data){
            console.log(data);
            deferred.resolve(data);
			alertas.mostrarToastEstandar("Se ha creado la imagen");
        })
        .error(function(data){
            deferred.reject(data);
        })

        return deferred.promise;
    }


    this.eliminarImagen = function(id, callback){
        $http.delete('/data/Imagen/' + id)
        .success(function(data){
            deferred.resolve(data);
            alertas.mostrarToastEstandar("Se ha eliminado la imagen");
        })
        .error(function(data){
            deferred.reject(data);
        })

        return deferred.promise;

    }

    this.obtenerImagenes = function(id){
        $http.get('/data/imagenesporCarrera/' + id)
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(data){

        })

        return deferred.promise;
    }

	this.portada = function(carrera, id){

        $http.put('/data/ImagenPortada/' + carrera).then(function(data){

            $http.post('/data/ImagenPortada/' + id)
            .success(function(data){
                deferred.resolve(data);
                alertas.mostrarToastEstandar("Se han actualizado la portada");
            })
            .error(function(data){

            })
        })

        return deferred.promise;

    }

});



app.service('Pagos', function($http, alertas, $q) {

    var deferred = $q.defer();

    this.habilitar = function(data) {

        console.log(data);

        $http.post('/conekta/usuario', {
            'nombre' : data.nombre,
            'correo' : data.correo
        })
        .success(function(data){
            alertas.mostrarToastEstandar("Se han habilitado los pagos");
            console.log(data);
        })
        .error(function(data){
            console.log(data)
        })
    };

    this.obtenerCliente = function(data, callback){

        $http.get('/conekta/usuario/' + data).then(callback);

    }

    this.crearOrden = function(orden, conekta_id) {

        var pinguino = orden;


        $http.post('/conekta/orden', {
            'name' : orden.name,
            'conekta_id' : conekta_id,
            'monto' : orden.monto
        })
        .success(function(data){
            alertas.mostrarToastEstandar("Se han generado la orden");
            deferred.resolve(data);
            console.log(data);


        })
        .error(function(data){
            console.log(data)
        })

        return deferred.promise;
    };

    this.obtenerOrdenes = function(conekta_id){
        $http.get('/conekta/obtenerOrdenes/' + conekta_id)
        .success(function(data){
            alertas.mostrarToastEstandar("Se han obtenido las ordenes");
            deferred.resolve(data);
        })
        .error(function(data){
            console.log(data);
        })

        return deferred.promise;

    }

    this.crearToken = function(tarjeta, conekta_id){

        Conekta.setPublishableKey('key_IjdPCsxQ1yqxC2sDj6x2AyQ');

        var successResponseHandler = function(token) {

            console.log(conekta_id);

            var union = {
                'token' : token.id,
                'conekta_id' : conekta_id
            }

            $http.post('/conekta/metododepago', union)
            .success(function(data){
                deferred.resolve(data);

            })
            .error(function(data){
                deferred.reject(data);
            })

        };

        var errorResponseHandler = function(error) {
            console.log(error);
			deferred.reject(data);
        };

        Conekta.token.create(tarjeta, successResponseHandler, errorResponseHandler);

        return deferred.promise;

    }

    this.eliminarTarjeta = function(cliente, tarjeta){
        $http.delete('/conekta/metododepago/' + cliente + '/' + tarjeta).success(function(data){
                deferred.resolve(data);
        })

        return deferred.promise;
    }

});
