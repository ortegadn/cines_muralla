const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Comida = sequelize.define("Comida", {
    id_comida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_comida: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
} )

Comida.sync();
module.exports = Comida;