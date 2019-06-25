const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Butaca = require('./Butaca');
const Funcion = require('./Funcion');

const Butaca_ocupada = sequelize.define("Butaca_ocupada")

Butaca_ocupada.belongsTo(Butaca, {as: 'butaca', foreignKey: 'id_butaca'});
Butaca_ocupada.belongsTo(Funcion, {as: 'funcion', foreignKey: 'id_funcion'});
Butaca_ocupada.sync()

module.exports = Butaca_ocupada;