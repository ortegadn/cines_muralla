const sequelize = require('sequelize');
const db = require('../config/database');
const Idioma = require('../models/Idioma');
const Subtitulo_pelicula = require('../models/Subtitulo_pelicula')

const controller = {};

controller.CreateIdioma = async function(data){
    try{
        Idioma.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetIdioma = async function(callback){
    try {
        let response = await Idioma.findAll({ 
        });
        let idioma = response.map(result => result.dataValues);
        callback(idioma, null);
    } catch (error) {
        callback(error, null);
    }
};

module.exports = controller;