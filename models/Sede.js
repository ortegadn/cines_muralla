const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sala = require("./Sala");
const Repertorio_pelicula = require("./Repertorio_pelicula");

const Sede = sequelize.define("Sede", {
        id_sede: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nombre_fiscal: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ubicacion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        horario_apertura: {
            type: Sequelize.TIME,
            allowNull: false
        },
        horario_cierre: {
            type: Sequelize.TIME,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['ubicacion', 'nombre_fiscal']
            }
        ]
    }
)

//Sede.hasMany(Sala,{as:'idsede',foreignKey:'id_sede'});
Sala.belongsTo(Sede, {as: 'sede', foreignKey: 'id_sede'});
Repertorio_pelicula.belongsTo(Sede, {as:"sede", foreignKey: "id_sede"});
Sede.sync();
module.exports = Sede;