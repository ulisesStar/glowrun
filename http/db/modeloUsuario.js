var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Usuario = sequelize.define('usuario', {
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
        password: Sequelize.STRING,
        conekta_id: Sequelize.STRING,
		fb_id: Sequelize.STRING,
		google_id: Sequelize.STRING
    })

    return Usuario;

};

module.exports = ex;
