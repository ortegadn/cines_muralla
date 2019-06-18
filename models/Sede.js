const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sala = require('../models/Sala');
const Tipo_formato = require('../models/Tipo_formato');

const Sede = sequelize.define("Sede", {
    id_sede: {
        type: Sequelize.STRING,
        primaryKey: true,
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
})
Sede.hasMany(Sala,{as:'idsede',foreignKey:'id_sede'});
Sede.sync();
module.exports = Sede;