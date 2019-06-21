const sequelize = require('sequelize');
const db = require('../config/database');
const Genero_pelicula = require('../models/Genero_pelicula');

const controller = {};

controller.CreateGenero = async function(data){
    try{
        console.log(data);
        Genero_pelicula.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetGeneros = async function(callback){
    try {
        let response = await Genero_pelicula.findAll({ 
        });
        let genero = response.map(result => result.dataValues);
        callback(genero, null);
        
    } catch (error) {
        callback(error, null);
    }
}

module.exports = controller;