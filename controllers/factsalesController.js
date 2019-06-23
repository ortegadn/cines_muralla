const sequelize = require('sequelize');
const db = require('../config/database');
const Pelicula = require('../models/Pelicula');
const Sede = require('../models/Sede');
const fact_sales = require('../models/fact_sales');

const controller = {};

controller.CreateFactSales = async function(data){
    try{
        console.log(data);
        fact_sales.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetFactSalesBySedeId = async function(data, callback){
    try {
        fact_sales.findAll({ 
            where: {
                id_sede: data.id_sede
            },
            include: [{model: Sede, as: 'sede'}, {model: Pelicula, as: 'pelicula'}]
        }).then(facturas => {
            let factsales = facturas.map(result => result.dataValues);
            callback(factsales); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.GetPelicula = async function(callback){
    try {
        let response = await Repertorio_pelicula.findAll({ 
            include: [{model: Idioma, as: 'idioma'}, {model: Censura_pelicula, as: 'censura'}, {model: Sede, as: 'sede'}, {model: Pelicula, as: 'pelicula', include: [{model:Genero_pelicula, as:'genero'}]}]
        });
        let pelicula = response.map(result => result.dataValues);
        callback(pelicula, null);
    } catch (error) {
        callback(error, null);
    }
};