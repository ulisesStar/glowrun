var express = require('express');
var routeCarreras = express.Router();

var x = require("../controllers/controllerCarreras");

routeCarreras.route('/data/Carreras')
        .get(x.read)
        .post(x.create)

routeCarreras.route('/data/Carreras/:id')
        .put(x.update)
        .get(x.read);


routeCarreras.route('/data/obtenerCarrerasconPortada')
        .get(x.obtenerCarrerasconPortada);

module.exports = routeCarreras;
