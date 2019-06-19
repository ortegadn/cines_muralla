const sequelize = require('sequelize');
const db = require('../config/database');
const Tipo_formato = require('../models/Tipo_formato.js');

const controller = {};

controller.CreateTipoFormato = async function(data){
    try{
        console.log(data);
        Tipo_formato.create(data);
    }catch (error){
        callback (null, error);
    }
};

module.exports = controller;