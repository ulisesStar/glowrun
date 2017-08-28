var express = require('express');
var routeFaqs = express.Router();

var x = require("../controllers/controllerFaqs");

routeFaqs.route('/data/Faqs')
        .get(x.read)
        .post(x.create)

routeFaqs.route('/data/Faqs/:id')
        .get(x.read);

module.exports = routeFaqs;
