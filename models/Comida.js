const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Comida = sequelize.define("Comida", {
    nombre_comida: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_producto: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
} )

Comida.sync()
module.exports = Comida;