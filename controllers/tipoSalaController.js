const sequelize = require('sequelize');
const db = require('../config/database');
const Tipo_sala = require('../models/Tipo_sala.js');

const controller = {};

controller.CreateTipoSala = async function(data){
    try{
        console.log(data);
        Tipo_sala.create(data);
    }catch (error){
        callback (null, error);
    }
};

/*controller.GetTipoSala = async function(callback){
    try {
        let response = await Tipo_sala.findAll({ 
        });
        let tipoSala = response.map(result => result.dataValues);
        callback(tipoSala, null);
        
    } catch (error) {
        callback(error, null);
    }
};*/

controller.GetIdByTipo = async function(data){
    let tipo_sala = Tipo_sala.find({
        where: {
            tipo_sala: data.tipo_sala
        }
    }).thenReturn(tipo_sala);
}


module.exports = controller;