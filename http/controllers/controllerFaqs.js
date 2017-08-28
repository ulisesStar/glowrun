var db = require('../relations');
var faqs = db.faqs;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    faqs.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        faqs.findById(id)
                .then(function (faqs) {
                    res.status(200).jsonp(faqs);
                });
    } else {
        faqs.findAll()
                .then(function (faqs) {
                    res.status(200).jsonp(faqs);
                });
    }
};
