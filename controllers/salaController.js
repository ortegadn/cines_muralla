const sequelize = require('sequelize');
const db = require('../config/database');
const Sala = require('../models/Sala.js');

const controller = {};

controller.CreateSala = async function(data){
    try{
        console.log(data);
        Sala.create(data);
    }catch (error){
        callback (null, error);
    }
};

module.exports = controller;