const sequelize = require('sequelize');
const db = require('../config/database');
const Comida = require('../models/Comida');

const controller = {};

controller.CreateComida = async function(data){
    try{
        console.log(data);
        Comida.create(data);
    }catch (error){
        callback (null, error);
    }
};

module.exports = controller;