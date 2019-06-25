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
};

controller.GetSedeByID = async function(data, callback){
    try {
        let response = await Sede.findAll({ 
            where: {
                id_sede: data.id_sede
            }
        });
        let sede = response.map(result => result.dataValues);
        callback(sede, null);
    } catch (error) {
        callback(error, null);
    }
}
controller.UpdateSede = async function (data){
    let response = Sede.update({
        horario_apertura: data.horario_apertura,
        horario_cierre: data.horario_cierre,
    },{
        where:{
            id_sede: data.id_sede
        }
    });
}

module.exports = controller;