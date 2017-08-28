var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Orden = sequelize.define('ordenes', {
        idConekta: Sequelize.STRING,
        status: Sequelize.STRING,
        cantidad: Sequelize.STRING,
    })

    return Orden;

};

module.exports = ex;
