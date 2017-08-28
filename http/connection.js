var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('heroku_72beb3b8743dd7a', 'bed674f9218fc6', '063f1057', {
    host: 'us-cdbr-iron-east-03.cleardb.net',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.sync()
    .then(function() {
        console.log('Connecion realizada');
    })
    .catch(function(err) {
        console.log('No se puede conectar a la bd:', err);
    }
);

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
