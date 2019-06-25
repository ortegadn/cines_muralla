const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Pelicula = require("./Pelicula");

const Genero_pelicula = sequelize.define("Genero_Pelicula", {
    id_genero: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    tipo_genero: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ['tipo_genero']
            }
        ]
    }
)

Genero_pelicula.sync();

module.exports = Genero_pelicula;