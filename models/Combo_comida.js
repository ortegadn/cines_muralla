const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Comida = require("./Comida");
const Combo = require("./Combo");

const Combo_comida = sequelize.define("Combo_comida", {
    id_combo_comida: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

Combo_comida.belongsTo(Comida, {as: 'comida', foreignKey: 'id_comida'});
Combo_comida.belongsTo(Combo, {as: 'combo', foreignKey: 'id_combo'});

Combo_comida.sync();
module.exports = Combo_comida;