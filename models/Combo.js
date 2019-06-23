const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const sequelize = require("../config/database");
const Comida = require("./Comida");


const Combo = sequelize.define("Combo", {
    id_combo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre_combo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
})

Comida.hasMany(Combo, {as:'idcomida', foreignKey:'id_comida'});
/*Combo.hasMany(Comida,{as:'idcombo',foreignKey:'id_combo'});*/
Combo.sync();
module.exports = Combo;