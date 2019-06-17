const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");

const Pelicula = sequelize.define("Pelicula", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duracion_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    genero: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    fecha_estreno: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Pelicula.sync()
module.exports = Pelicula;