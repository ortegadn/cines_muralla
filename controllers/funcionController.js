const sequelize = require('sequelize');
const db = require('../config/database');
const Funcion = require('../models/Funcion');

const controller = {};

controller.CreateFuncion = async function(data){
    try{
        console.log(data);
        Funcion.create(data);
    }catch (error){
        callback (null, error);
    }
};

module.exports = controller;