//vales
const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Butaca = sequelize.define("Butaca", {
    id_butaca: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
    },
} )

Butaca.sync()
module.exports = Butaca;