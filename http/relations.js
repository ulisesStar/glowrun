
// Conexión Sequelize
var conector = require('./connection');

//- Modelos

var imagen = require('./db/modeloImagen')(conector);
var usuario = require('./db/modeloUsuario')(conector);
var orden = require('./db/modeloOrden')(conector);
var ciudad = require('./db/modeloCiudades')(conector);
var carrera = require('./db/modeloCarreras')(conector);
var faqs = require('./db/modeloFaqs')(conector);
var patrocinadores = require('./db/modeloPatrocinadores')(conector);

//- Relations
//Relaciones  Origen - Destino

usuario.belongsToMany(carrera, {as: 'Carreras', through: 'carreras_usuario'});
carrera.belongsToMany(usuario, {as: 'Usuario', through: 'carreras_usuario'});

ciudad.hasMany(carrera,{foreignKey:'IdCiudad'});

carrera.hasMany(imagen,{foreignKey:'IdCarrera'});

orden.belongsTo(carrera, {foreignKey:'IdCarrera'});
orden.belongsTo(usuario, {foreignKey:'IdUsuario'});

// carrera.hasMany(orden, {foreignKey:'IdCarrera'});
// usuario.hasMany(orden, {foreignKey:'IdUsuario'});

patrocinadores.belongsToMany(carrera, {as: 'Carreras', through: 'carreras_patrocinadores'});
carrera.belongsToMany(patrocinadores, {as: 'Patrocinadores', through: 'carreras_patrocinadores'});

module.exports.imagen = imagen;
module.exports.faqs = faqs;
module.exports.usuario = usuario;
module.exports.carrera = carrera;
module.exports.ciudad = ciudad;
module.exports.orden = orden;
module.exports.patrocinadores = patrocinadores;
