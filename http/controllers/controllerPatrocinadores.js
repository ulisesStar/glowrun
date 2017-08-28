var db = require('../relations');
var patrocinadores = db.patrocinadores;
var carrera = db.carrera;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;

    var id = data.idcarrera;

    patrocinadores.create(data)
    .then(function (patrocinador) {

            console.log(id);

        carrera.findById(id)
            .then(function(carrera){
                carrera.addPatrocinadores(patrocinador.id);
            })
            .then(res.send.bind(res));
        })
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        patrocinadores.findById(id, {
            include: [{
                model: carrera,
                as: 'Carreras'
            }]
        })
            .then(function (patrocinadores) {
                res.status(200).jsonp(patrocinadores);
            });
    } else {
            patrocinadores.findAll({
                include: [{
                    model: carrera,
                    as: 'Carreras'
                }]
            })
            .then(function (patrocinadores) {
                res.status(200).jsonp(patrocinadores);
            });
    }
};
