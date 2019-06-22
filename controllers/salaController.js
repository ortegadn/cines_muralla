const sequelize = require('sequelize');
const db = require('../config/database');
const Sala = require('../models/Sala.js');
const Tipo_formato = require('../models/Tipo_formato.js');
const Tipo_sala = require('../models/Tipo_sala.js');
const Sede = require('../models/Sede');

const controller = {};

controller.CreateSala = async function(data){
    try{
        console.log(data);
        Sala.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetSalasBySedeId = async function(data, callback){
    try {
        Sala.findAll({ 
            where: {
                id_sede: data.id_sede
            },
            include: [{model: Tipo_formato, as: 'formato'}, {model: Tipo_sala, as: 'tiposala'}, {model: Sede, as: 'sede'}]
        }).then(salas => {
            let sala_sede = salas.map(result => result.dataValues);
            callback(sala_sede); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.GetSalas = async function(callback){
    try {
        let response = await Sala.findAll({ 
            include: [{model: Tipo_formato, as: 'formato'}, {model: Tipo_sala, as: 'tiposala'}, {model: Sede, as: 'sede'}]
        });
        let sala = response.map(result => result.dataValues);
        callback(sala, null);
    } catch (error) {
        callback(error, null);
    }
};

module.exports = controller;