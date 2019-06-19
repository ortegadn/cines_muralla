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

controller.UpdatePelicula = async function (data){
    let response = Pelicula.update({
        descripcion: data.descripcion,
        genero: data.genero,
        duracion_min: data.duracion_min,
        fecha_estreno: data.fecha_estreno
    },{
        where:{
            id_pelicula: data.id_pelicula
        }
    });
}

controller.DeletePelicula = async function (data){
    console.log(data)
    let response = Pelicula.destroy({
        where:{
            id_pelicula: data.id_pelicula
        }
    })
}
module.exports = controller;