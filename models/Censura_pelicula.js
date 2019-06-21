const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Censura_pelicula = sequelize.define("Censura_pelicula", {
    id_censura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    censura: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Censura_pelicula.sync();

module.exports = Censura_pelicula;

