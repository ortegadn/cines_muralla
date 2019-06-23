const sequelize = require('sequelize');
const db = require('../config/database');
const Funcion = require('../models/Funcion');
const Repertorio_pelicula = require('./repertorioController');

const controller = {};

controller.CreateFuncion = async function(data){
    try{
        console.log(data);
        Funcion.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetFuncionByRepertorioId = async function(data, callback){
    try {
        Funcion.findAll({ 
            where: {
                id_repertorio: data.id_repertorio
            }
        }).then(repertorios => {
            let repertorio_sede = repertorios.map(result => result.dataValues);
            callback(repertorio_sede); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.DeleteFuncion = async function (data){
    Funcion.destroy({
        where:{
            id_funcion: data.id_funcion
        }
    });
}

module.exports = controller;