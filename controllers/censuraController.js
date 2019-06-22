const sequelize = require('sequelize');
const db = require('../config/database');
const Censura_pelicula = require('../models/Censura_pelicula');

const controller = {};

controller.CreateCensura = async function(data){
    try{
        console.log(data);
        Censura_pelicula.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetCensura = async function(callback){
    try {
        let response = await Censura_pelicula.findAll({ 
        });
        let censura = response.map(result => result.dataValues);
        callback(censura, null);
    } catch (error) {
        callback(error, null);
    }
};

module.exports = controller;