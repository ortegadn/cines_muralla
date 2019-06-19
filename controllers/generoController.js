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

module.exports = controller;