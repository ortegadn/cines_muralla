const sequelize = require('sequelize');
const db = require('../config/database');
const Combo = require('../models/Combo.js');

const controller = {};

controller.CreateCombo = async function(data){
    try{
        console.log(data);
        Combo.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetCombo = async function(callback){
    try {
        let response = await Combo.findAll({ 
        });
        let sede = response.map(result => result.dataValues);
        callback(combo, null);
        
    } catch (error) {
        callback(error, null);
    }
};
 
module.exports = controller;