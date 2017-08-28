var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Ciudad = sequelize.define('ciudades', {
        nombre: Sequelize.STRING,
        coordenadas: Sequelize.STRING,
    })

    return Ciudad;

};

module.exports = ex;
