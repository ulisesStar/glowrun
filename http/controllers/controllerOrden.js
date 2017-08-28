var db = require('../relations');
var orden = db.orden;
var carrera = db.carrera;
var usuario = db.usuario;

var conekta = require('conekta');

conekta.api_key = 'key_g3myyeP1cwedgPZJWiiVaA';
conekta.api_version = '2.0.0';
conekta.locale = 'es';


var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;

    var ordenconekta = {
        "currency": "MXN",
        "customer_info": {
            "customer_id": data.usuario.conekta_id
        },
        "line_items": [
            {
                "name": data.carrera.nombre,
                "unit_price": data.carrera.precio,
                "quantity": 1
            }
        ],
        "charges": [
            {
                "payment_method": {
                    "type": "default"
                }
            }
        ]
    }

    conekta.Order.create(ordenconekta, function(err, order) {

        console.log(order);

        var nuevaorden = {
            idConekta: order._id,
            status: order._json.payment_status,
            cantidad: data.carrera.precio,
            IdCarrera:  data.carrera.id,
            IdUsuario: data.usuario.id
        }

        orden.create(nuevaorden)
            .then(function (result) {
                res.status(200).jsonp(result);
            });
    })

};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        orden.findById(id)
        .then(function (orden) {
            res.status(200).jsonp(orden);
        });
    } else {
        orden.findAll({
            include :
            [
                {
                    model: usuario,
                },
                {
                    model: carrera,
                }
            ]
        })
        .then(function (orden) {
            res.status(200).jsonp(orden);
        });
    }
};

ex.update = function(req, res, next) {


    var id = req.params.id;

    console.log(data);

    orden.findById(data.id).then(orden => {
        orden.update(
            {idConekta: data.idConekta}
        )
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

}

ex.ordenesdeusuario = function(req, res, next) {

    var id = req.params.id;

    orden.findAll({

        where: {
            IdUsuario: id
        },
        include :
        [
            {
                model: carrera,
            }
        ]

    }).then(function(result) {
        res.status(200).jsonp(result);
    });

}
