var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Faqs = sequelize.define('faqs', {
        titulo: Sequelize.STRING,
        contenido: Sequelize.STRING,
    })

    return Faqs;

};

module.exports = ex;
