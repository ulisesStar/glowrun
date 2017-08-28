var express = require('express');
var routeImagen = express.Router();

var x = require("../controllers/controllerImagen");

routeImagen.route('/data/Imagen')
        .get(x.read);

routeImagen.route('/data/Imagen/:id')
        .post(x.create)
        .delete(x.delete)
        .get(x.read);

routeImagen.route('/data/imagenesporCarrera/:id')
        .get(x.imagenesporCarrera);

routeImagen.route('/data/ImagenPortada/:IdCarrera')
        .post(x.asignarPortadas)
        .put(x.borrarPortadas);

module.exports = routeImagen;
