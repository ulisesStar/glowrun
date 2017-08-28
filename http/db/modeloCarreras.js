var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Carreras = sequelize.define('carreras', {
        nombre: Sequelize.STRING,
        fecha: Sequelize.DATE,
        video: Sequelize.STRING,
		precio: Sequelize.INTEGER,
    })

    return Carreras;

};

module.exports = ex;
