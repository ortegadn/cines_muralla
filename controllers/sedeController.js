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

controller.GetSede = async function(callback){
    try {
        let response = await Sede.findAll({ 
        });
        let sede = response.map(result => result.dataValues);
        callback(sede, null);
        
    } catch (error) {
        callback(error, null);
    }
}

module.exports = controller;