const sequelize = require('sequelize');
const db = require('../config/database');
const Sede = require('../models/Sede.js');

const controller = {};

controller.CreateSede = async function(data){
    try{
        console.log(data);
        Sede.create(data);
    }catch (error){
        callback (null, error);
    }
};

module.exports = controller;