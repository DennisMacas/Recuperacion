'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');


const Factura = db.define('Factura', {
    id_factura: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    no_factura:{
        type: Sequelize.STRING(6)
    },
    cliente:{
        type: Sequelize.STRING(50)
    },
    cedula: {
        type: Sequelize.INTEGER(50)
    },
    clasificacion: {
        type: Sequelize.STRING(50)
    },
    total: {
        type: Sequelize.DOUBLE
    },
    fecha: {
        type: Sequelize.DATEONLY
    }
});
Factura.sync();

module.exports = Factura;

