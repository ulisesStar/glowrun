var db = require('../relations');
var imagen = db.imagen;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    imagen.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        imagen.findById(id)
                .then(function (imagen) {
                    res.status(200).jsonp(imagen);
                });
    } else {
        imagen.findAll()
                .then(function (imagenes) {
                    res.status(200).jsonp(imagenes);
                });
    }
};
