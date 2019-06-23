const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Idioma = require("./Idioma")

const Subtitulo_pelicula = sequelize.define("Subtitulo_pelicula", {
    id_subtitulo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    }
});

Subtitulo_pelicula.belongsTo(Idioma, {as: 'idioma', foreignKey:"id_idioma"});
Subtitulo_pelicula.sync();

module.exports = Subtitulo_pelicula;