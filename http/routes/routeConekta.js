var express = require('express');
var routeConekta = express.Router();

var x = require("../controllers/controllerConekta");

routeConekta.route('/conekta/usuario')
        .post(x.crearCliente);

routeConekta.route('/conekta/usuario/:idUsuario')
        .get(x.encontrarCliente);

routeConekta.route('/conekta/orden')
        .post(x.crearOrden);

routeConekta.route('/conekta/obtenerOrdenes/:idUsuario')
        .get(x.obtenerOrdenes);

routeConekta.route('/conekta/metododepago')
        .post(x.crearMetododepago);

routeConekta.route('/conekta/metododepago/:idUsuario/:idTarjeta')
        .delete(x.eliminarMetododepago);



//
// routeConekta.route('/conekta/orden')
//         .get(x.read)
//         .post(x.create);


module.exports = routeConekta;
