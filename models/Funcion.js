const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sala = require("./Sala");
const Repertorio_pelicula = require("./Repertorio_pelicula");

const Funcion = sequelize.define("Funcion", {
        id_funcion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATEONLY,
            allowNull: false 
        },
        hora_inicio: {
            type: Sequelize.TIME,
            allowNull: false
        }
    },
    {
        indexes: [{
            unique: true,
            name: "repertorio_sala_fecha_hora",
            fields: ['id_repertorio','id_sala','fecha','hora_inicio']
        }]
    }

);

Funcion.belongsTo(Sala, {as: 'sala', foreignKey: "id_sala"});
Funcion.belongsTo(Repertorio_pelicula, {as: 'repertorio', foreignKey: "id_repertorio"});

Funcion.sync();

module.exports = Funcion;
