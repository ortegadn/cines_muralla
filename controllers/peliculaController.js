const sequelize = require('sequelize');
const db = require('../config/database');
const Pelicula = require('../models/Pelicula.js');

const controller = {};

controller.CreatePelicula = async function(data){
    try{
        console.log(data);
        Pelicula.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetPelicula = async function(callback){
    try {
        let response = await Pelicula.findAll({ 
        });
        let pelicula = response.map(result => result.dataValues);
        callback(pelicula, null);
        
    } catch (error) {
        callback(error, null);
    }
}

controller.DeletePelicula = async function (data){
    console.log(data)
    let response = Pelicula.destroy({
        where:{
            titulo: data.titulo
        }
    })
}
module.exports = controller;