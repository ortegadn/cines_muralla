const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
//const Sede = require('../models/Sede.js');
const Tipo_sala = require('../models/Tipo_sala');
const Tipo_formato = require('../models/Tipo_formato');

const Sala = sequelize.define("Sala", {
    id_sala: {
        type: Sequelize.CHAR(1),
        primaryKey: true,
        allowNull: false
    }
});

//Tipo_formato.hasMany(Sala,{as:'idformato',foreignKey:'id_formato'});
Sala.belongsTo(Tipo_formato, {as:'idformato',foreignKey:'id_formato'});
Sala.belongsTo(Tipo_sala, {as:'idtiposala', foreignKey:'id_tipo_sala'});
Sala.sync();
module.exports = Sala;