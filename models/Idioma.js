const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Idioma = sequelize.define("Idioma", {
    id_idioma: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idioma: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Idioma.sync();

module.exports = Idioma;