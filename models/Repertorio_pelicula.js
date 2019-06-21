const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sede = require("./Sede");
const Pelicula = require("./Pelicula");
const Censura_pelicula = require("./Censura_pelicula");
const Idioma = require("./Idioma");
//const Subtitulo_pelicula = require("./Subtitulo_pelicula");

const Repertorio_pelicula = sequelize.define("Repertorio_pelicula", {
    id_repertorio:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_subtitulo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

Sede.hasMany(Repertorio_pelicula, {foreignKey: "id_sede"});
//Repertorio_pelicula.belongsTo(Subtitulo_pelicula, {foreignKey: "id_subtitulo"});
Repertorio_pelicula.belongsTo(Pelicula, {foreignKey:"id_pelicula"});
Repertorio_pelicula.belongsTo(Censura_pelicula, {foreignKey:"id_censura"});
Repertorio_pelicula.belongsTo(Idioma, {foreignKey:"id_idioma"});


Repertorio_pelicula.sync();

module.exports = Repertorio_pelicula;