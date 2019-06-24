const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
/*const Tipo_sala = require('../models/Tipo_sala');*/
const Sala = require('../models/Sala');

const Tipo_formato = sequelize.define("Tipo_formato", {
    id_formato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    tipo_formato: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ['tipo_formato']
            }
        ]
    }
)

//Sede.hasMany(Sala,{as:'idsede',foreignKey:'id_sede'});

Tipo_formato.sync();

module.exports = Tipo_formato;

