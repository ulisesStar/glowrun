var express = require('express');
var routePatrocinadores = express.Router();

var x = require("../controllers/controllerPatrocinadores");

routePatrocinadores.route('/data/Patrocinadores')
        .get(x.read)
        .post(x.create);

routePatrocinadores.route('/data/Patrocinadores/:id')
        .get(x.read);

module.exports = routePatrocinadores;
