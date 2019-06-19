const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
/*const Tipo_sala = require('../models/Sala');*/

const Tipo_sala = sequelize.define("Tipo_sala", {
    id_tipo_sala:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    tipo_sala: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Sede.hasMany(Sala,{as:'idsede',foreignKey:'id_sede'});
Tipo_sala.sync();
module.exports = Tipo_sala;

