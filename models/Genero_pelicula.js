const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Genero_pelicula = sequelize.define("Genero_Pelicula", {
    id_genero: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    tipo_genero: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Genero_pelicula.sync();

module.exports = Genero_pelicula;