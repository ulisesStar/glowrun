var db = require('../relations');
var carrera = db.carrera;
var imagen = db.imagen;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;

    console.log(data);

    carrera.create(data)
        .then(function (result) {
            res.status(200).jsonp(result);
    });
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        carrera.findById(id)
                .then(function (carrera) {
                    res.status(200).jsonp(carrera);
                });
    } else {
        carrera.findAll()
                .then(function (carreras) {
                    res.status(200).jsonp(carreras);
                });
    }
};

ex.update = function (req, res, next) {

    var id = req.params.id;
    var data = req.body;

	console.log(data);

    carrera.findById(id).then(imagen => {
        imagen.update(data)
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.obtenerCarrerasconPortada = function (req, res, next) {

    carrera.findAll({
        include :
        [
            {
                model: imagen,
                where: {
                    Portada: '1'
                },
                required: false
            }
        ]
    }).then(carreras => {

        res.status(200).jsonp(carreras);

    });

};
