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


controller.GetComida = async function(callback){
    try {
        let response = await Comida.findAll({ 
        });
        let comida = response.map(result => result.dataValues);
        callback(comida, null);
        
    } catch (error) {
        callback(error, null);
    }
};


controller.DeleteComida = async function (data){
    console.log(data)
    let response = Comida.destroy({
        where:{
            id_comida: data.id_comida
        }
    })
}
module.exports = controller;