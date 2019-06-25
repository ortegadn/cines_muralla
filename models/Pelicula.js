const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Genero_pelicula = require('../models/Genero_pelicula');

const Pelicula = sequelize.define("Pelicula", {
        id_pelicula: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        duracion_min: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        fecha_estreno: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                name: 'pelicula_unica',
                fields: ['titulo', 'descripcion', 'id_genero', 'duracion_min', 'fecha_estreno']
            }
        ]
    }
);

Pelicula.belongsTo(Genero_pelicula, {as:'genero', foreignKey:'id_genero'});
Pelicula.sync()
module.exports = Pelicula;