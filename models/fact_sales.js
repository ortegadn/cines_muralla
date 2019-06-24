const Sequelize = require ("require");
Sequelize.promise = global.Promise;
const sequelize = require("../config/database");
const Pelicula = require('../models/Pelicula');
const Sede = require('../models/Sede');
/*const fact_sales = require('../models/');*/

const fact_sales = sequelize.define("Fact_sales",{

    id_factura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    dia_compra:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

fact_sales.belongsTo(Sede, {as: "nombre_fiscal", foreignKey:"id_sede"});
fact_sales.belongsTo(Pelicula, {as:"pelicula", foreignKey:"id_pelicula" });