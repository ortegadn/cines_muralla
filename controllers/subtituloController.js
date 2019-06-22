const sequelize = require('sequelize');
const db = require('../config/database');
const Subtitulo_pelicula = require('../models/Subtitulo_pelicula');
const Idioma = require("../models/Idioma");

const controller = {};

controller.CreateSubtitulo = async function(data){
    try{
        Subtitulo_pelicula.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetSubtitulos = async function(callback){
    try {
        Subtitulo_pelicula.findAll({ 
            include: [{model: Idioma, as: 'idioma'}]
        }).then(sub => {
            let subtitulos = sub.map(result => result.dataValues);
            callback(subtitulos); 
        });
    } catch (error) {
        callback(error, null);
    }
};

module.exports = controller;