const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sede = require('./Sede');
const Tipo_sala = require('./Tipo_sala');
const Tipo_formato = require('./Tipo_formato');

const Sala = sequelize.define("Sala", {
        id_sala: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        sala: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cant_entradas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cant_salidas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cant_pasillos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cant_filas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cant_columnas: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['id_sede', 'sala']
            }
        ]
    }
);

//Tipo_formato.hasMany(Sala,{as:'idformato',foreignKey:'id_formato'});
Sala.belongsTo(Tipo_formato, {as:'formato',foreignKey:'id_formato'});
Sala.belongsTo(Tipo_sala, {as:'tiposala', foreignKey:'id_tipo_sala'});
Sala.sync();

module.exports = Sala;