const sequelize = require('sequelize');
const db = require('../config/database');
const Repertorio_pelicula = require('../models/Repertorio_pelicula');

const controller = {};

controller.CreateRepertorio = async function(data){
    try{
        console.log(data);
        Repertorio_pelicula.create(data);
    }catch (error){
        callback (null, error);
    }
};

module.exports = controller;