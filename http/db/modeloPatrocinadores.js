var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Patrocinadores = sequelize.define('patrocinadores', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        imagen: {
            type: Sequelize.BLOB('medium'),
            get() {
                var imagenBin = this.getDataValue('imagen');
                var Imagenes = new Buffer(imagenBin).toString('ascii');
                return Imagenes
            },
            // set(imagen) {
            //
            //     return imagen
            //
            // }
        },
    })

    return Patrocinadores;

};

module.exports = ex;
