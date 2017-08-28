var conekta = require('conekta');

var db = require('../relations');
var usuario = db.usuario;

var config = require('../../conf/oauth.js');

var ex = module.exports = {};

conekta.api_key = 'key_g3myyeP1cwedgPZJWiiVaA';
conekta.api_version = '2.0.0';
conekta.locale = 'es';

ex.crearCliente = function(req, res, next) {

    var data = req.body;

	conekta.Customer.create({
		name: data.nombre,
		email: data.correo,
		payment_sources: [
			{
				token_id: 'tok_test_visa_4242',
				type: 'card'
			}
		]
	}, function(err, customer) {
		res.status(200).jsonp(customer);
		usuario.find({
			where: {
				correo: data.correo
			}
		}).then(function(usuario) {
			usuario.updateAttributes({customer_id: customer._id})
		})
	});

};

ex.encontrarCliente = function(req, res, next) {

    var id = req.params.idUsuario;

    conekta.Customer.find(id, function(err, cliente) {
        res.status(200).jsonp(cliente);
    })

};

ex.crearOrden = function(req, res, next) {

    var data = req.body;

    console.log(data);

    var orden = {
        "currency": "MXN",
        "customer_info": {
            "customer_id": data.conekta_id
        },
        "line_items": [
            {
                "name": data.name,
                "unit_price": data.monto,
                "quantity": 1
            }
        ],
        "charges": [
            {
                "payment_method": {
                    "type": "default"
                }
            }
        ]
    }

    console.log(orden);

    conekta.Order.create(orden, function(err, order) {
        res.status(200).jsonp(order);
    })

};

ex.obtenerOrdenes = function(req, res, next){

    var idUsuario = req.params.idUsuario;

    conekta.Customer.find(idUsuario, function(err, customer) {

        res.status(200).jsonp(customer);

    });

}

ex.crearMetododepago = function(req, res, next) {

    var data = req.body;

    console.log(data);

    conekta.Customer.find(data.conekta_id, function(err, customer) {
        customer.createPaymentSource({
            type: "card",
            token_id: data.token
        }, function(err, tarjeta) {
            res.status(200).jsonp(tarjeta);
            console.log(tarjeta)
        });
    });

};

ex.eliminarMetododepago = function(req, res, next) {

    var idUsuario = req.params.idUsuario;

    var idTarjeta = req.params.idTarjeta;

    console.log(idTarjeta)


    conekta.Customer.find(idUsuario, function(err, customer) {

        customer.payment_sources.get(idTarjeta).delete(function(err, resp) {
            console.log(resp);
            res.status(200).jsonp(idTarjeta);
        })
    });

}
