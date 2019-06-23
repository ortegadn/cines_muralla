const sequelize = require('sequelize');
const db = require('../config/database');
const Repertorio_pelicula = require('../models/Repertorio_pelicula');
const Pelicula = require('../models/Pelicula');
const Censura_pelicula = require('../models/Censura_pelicula');
const Idioma = require('../models/Idioma');
const Sede = require('../models/Sede');
const Genero_pelicula = require('../models/Genero_pelicula');
const Subtitulo_pelicula = require('../models/Subtitulo_pelicula');
const Funcion = require('../models/Funcion');

const controller = {};

controller.CreateRepertorio = async function(data){
    try{
        console.log(data);
        Repertorio_pelicula.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetRepertorioBySedeId = async function(data, callback){
    try {
        Repertorio_pelicula.findAll({ 
            where: {
                id_sede: data.id_sede
            },
            include: [{model: Idioma, as: 'idioma'}, {model: Censura_pelicula, as: 'censura'}, {model: Sede, as: 'sede'}, {model: Pelicula, as: 'pelicula', include: [{model:Genero_pelicula, as:'genero'}]}, {model: Subtitulo_pelicula, as: 'subtitulo', include: [{model: Idioma, as: 'idioma'}]}]
        }).then(repertorios => {
            let repertorio_sede = repertorios.map(result => result.dataValues);
            callback(repertorio_sede); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.GetRepertorioById = async function(data, callback){
    try {
        Repertorio_pelicula.findAll({ 
            where: {
                id_repertorio: data.id_repertorio
            },
            include: [{model: Idioma, as: 'idioma'}, {model: Censura_pelicula, as: 'censura'}, {model: Sede, as: 'sede'}, {model: Pelicula, as: 'pelicula', include: [{model:Genero_pelicula, as:'genero'}]}, {model: Subtitulo_pelicula, as: 'subtitulo', include: [{model: Idioma, as: 'idioma'}]}]
        }).then(repertorios => {
            let repertorio = repertorios.map(result => result.dataValues);
            callback(repertorio); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.GetRepertorios = async function(callback){
    try {
        let response = await Repertorio_pelicula.findAll({ 
            include: [{model: Idioma, as: 'idioma'}, {model: Censura_pelicula, as: 'censura'}, {model: Sede, as: 'sede'}, {model: Pelicula, as: 'pelicula', include: [{model:Genero_pelicula, as:'genero'}]}, {model: Subtitulo_pelicula, as: 'subtitulo', include: [{model: Idioma, as: 'idioma'}]}]
        });
        let repertorio = response.map(result => result.dataValues);
        callback(repertorio, null);
    } catch (error) {
        callback(error, null);
    }
};

controller.DeleteRepertorio = async function (data){
    Funcion.destroy({
        where:{
            id_repertorio: data.id_repertorio
        }
    }).then(res => {
        Repertorio_pelicula.destroy({
            where:{
                id_repertorio: data.id_repertorio
            }
        })
    });
}

module.exports = controller;