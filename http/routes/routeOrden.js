var express = require('express');
var routeOrden = express.Router();

var x = require("../controllers/controllerOrden");

routeOrden.route('/data/Orden')
        .get(x.read)
        .put(x.update)
        .post(x.create);

routeOrden.route('/data/Orden/:id')
        .get(x.read);

routeOrden.route('/data/ordenesdeusuario/:id')
        .get(x.ordenesdeusuario);




module.exports = routeOrden;
