const sequelize = require('sequelize');
const db = require('../config/database');
const Combo_comida = require('../models/Combo_comida');
const Comida = require('../models/Comida');
const Combo = require('../models/Combo');

const controller = {};

controller.AddComidaToCombo = async function(data){
    try{
        Combo_comida.create(data);
    }catch (error){
        callback (null, error);
    }
};

controller.GetComboComidaByIdCombo = async function(data, callback){
    try {
        Combo_comida.findAll({ 
            where: {
                id_combo: data.id_combo
            },
            include: [{model: Comida, as: 'comida'}, {model: Combo, as: 'combo'}]
        }).then(combos => {
            let comboC = combos.map(result => result.dataValues);
            callback(comboC); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.GetComboComidaCombo = async function(callback){
    try {
        Combo_comida.findAll({ 
            include: [{model: Comida, as: 'comida'}, {model: Combo, as: 'combo'}]
        }).then(combos => {
            let comboC = combos.map(result => result.dataValues);
            callback(comboC); 
        });
    } catch (error) {
        callback(error, null);
    }
};

controller.DeleteCombo = async function (data){
    let response = Combo_comida.destroy({
        where:{
            id_combo_comida: data.id_combo_comida
        }
    })
}

module.exports = controller;
