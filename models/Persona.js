const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Persona = sequelize.define("Persona", {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    }
} )

Persona.sync()
module.exports = Persona;