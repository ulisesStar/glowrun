var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Imagen = sequelize.define('imagenes', {
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
		portada: Sequelize.INTEGER
    })

    return Imagen;
};

module.exports = ex;
