'use strict';


const Factura = require('../models/Factura');

const SW = {};


    SW.obtenerFacturas = (req, res) => {
        Factura.findAll({})
        .then(function(facturas){
            res.status(200).json(facturas);
        }).catch(function(err){
            console.log("Error al obtener facturas");
        });
    } 



module.exports = SW ;