const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Sala = require("./Sala");

const Butaca = sequelize.define("Butaca", {
    id_butaca: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true
    },
    fila: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    columna: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
} )

Butaca.belongsTo(Sala, {as: 'sala', foreignKey: 'id_sala'});
Butaca.sync()
module.exports = Butaca;