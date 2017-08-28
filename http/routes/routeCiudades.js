var express = require('express');
var routeCiudad = express.Router();

var x = require("../controllers/controllerCiudades");

routeCiudad.route('/data/Ciudad')
        .get(x.read)
        .post(x.create)

routeCiudad.route('/data/Ciudad/:id')
        .get(x.read);

module.exports = routeCiudad;
