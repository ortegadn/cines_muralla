//vales
const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sede = require('../models/Sede.js');

const Butaca = sequelize.define("Butaca", {
    id_butaca: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
    },
} )

Comida.sync()
module.exports = Comida;