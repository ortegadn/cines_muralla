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
        type: Sequelize.DATE,
        allowNull: false
    }
})

Genero_pelicula.hasMany(Pelicula, {as:'idgenero', foreignKey:'id_genero'});
Pelicula.sync()
module.exports = Pelicula;