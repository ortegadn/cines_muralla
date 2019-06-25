const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sede = require("./Sede");
const Pelicula = require("./Pelicula");
const Censura_pelicula = require("./Censura_pelicula");
const Idioma = require("./Idioma");
const Subtitulo_pelicula = require("./Subtitulo_pelicula");

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
    },
    {
        indexes: [
            {
                unique: true,
                name: "pelicula_idioma_sub",
                fields: ['id_sede','id_pelicula', 'id_idioma', 'id_subtitulo']
            }
        ]
    }

)


Repertorio_pelicula.belongsTo(Subtitulo_pelicula, {as:"subtitulo", foreignKey: "id_subtitulo"});
Repertorio_pelicula.belongsTo(Pelicula, {as:"pelicula", foreignKey:"id_pelicula"});
Repertorio_pelicula.belongsTo(Censura_pelicula, {as:"censura", foreignKey:"id_censura"});
Repertorio_pelicula.belongsTo(Idioma, {as:"idioma", foreignKey:"id_idioma"});


Repertorio_pelicula.sync();

module.exports = Repertorio_pelicula;