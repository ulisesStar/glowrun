var db = require('../relations');
var ciudad = db.ciudad;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    ciudad.create(data)
        .then(function (result) {
            res.status(200).jsonp(result);
    });
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        ciudad.findById(id)
                .then(function (ciudad) {
                    res.status(200).jsonp(ciudad);
                });
    } else {
        ciudad.findAll()
                .then(function (ciudades) {
                    res.status(200).jsonp(ciudades);
                });
    }
};
