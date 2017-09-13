var db = require('../relations');
var imagen = db.imagen;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    var id = req.params.id;

    console.log(req.params.id)

    imagen.create({imagen: data.imagen, IdCarrera: id}).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        imagen.findById(id).then(function(imagen) {
            res.status(200).jsonp(imagen);
        });
    } else {
        imagen.findAll().then(function(imagenes) {
            res.status(200).jsonp(imagenes);
        });
    }
};

ex.imagenesporCarrera = function(req, res, next) {

    var id = req.params.id;

    imagen.findAll({
        where: {
            IdCarrera: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

}

ex.delete = function(req, res, next) {

    var id = req.params.id;

    imagen.findById(id).then(function(imagen) {
        imagen.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};



ex.borrarPortadas = function(req, res, next) {

    var id = req.params.IdCarrera;

    imagen.findAll({
        where: {
            IdCarrera: id
        }
    }).then(imagenes => {
        imagenes.forEach(imagen => {
            imagen.update({portada: 0})
        })
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

}

ex.asignarPortadas = function(req, res, next) {

    var id = req.params.IdCarrera;

    imagen.findById(id).then(imagen => {
        imagen.update(
            {portada: 1}
        )
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

}
