
const Factura = require('../models/Factura');

const sequelize = require('sequelize');

const FacturaController = {};

FacturaController.listarFacturas = (req, res) =>{
    Factura.findAll({})
    .then(facturas => {
        res.status(200).json(facturas);  
    }).catch(err => {
        res.status(500).send();
    });
};

FacturaController.obtenerFactura = (req, res) => {
    Factura.findOne({
        where: { id_factura: req.body.id_factura }
    })
    .then(factura => {
        if(factura){
            res.status(200).json(factura);
        }else{
            res.status(404).send();
        }
    }).catch(err => {
        res.status(500).send();
    });
};

FacturaController.guardarFactura = (req, res) => {
    Factura.create(req.body)
        .then(factura => {
            if(factura){
                req.flash('GOOD', 'El registro se ha completado.', '/');
            }else{
                req.flash('BAD', 'La factura no se ha registrado.', '/');
            }
        }).catch(err => {
            console.log(err);
            req.flash('BAD', 'Ha ocurrido un error.', '/');
        });
}

FacturaController.modificarFactura = (req, res) => {
    Factura.update({
        no_factura: req.body.nro_factura,
        cliente: req.body.cliente,
        cedula: req.body.cedula,
        clasificacion: req.body.clasificacion,
        total: req.body.total,
        fecha: req.body.fecha,
    }, { where: { id_factura: req.params } })
        .then(factura => {
            if(factura){
                req.flash('GOOD', 'El registro se ha modificado.', '/');
            }else{
                req.flash('BAD', 'La factura no se ha encontrado', '/');
            }
        }).catch(err => {
            console.log(err);
            req.flash('BAD', 'Ha ocurrido un error.', '/');
        });
}

FacturaController.cargarClasificacion = (req, res) => {
    var lista = ["Comida", "Vestimenta", "Educación", "Salud", "Transporte", "Arriendo"];
    res.status(200).json(lista);
}

FacturaController.sumaGastosPersonales = (req, res) => {
    Factura.sum('total',{ where: {
            [sequelize.Op.or]: [
                { categoria: 'Comida' },
                { categoria: 'Vestimenta' },
                { categoria: 'Educación' },
                { categoria: 'Salud' }
            ],
            id_persona: req.params.id
        }
    }).then(sum =>{
        res.status(200).json({
            suma: sum
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).send();
    });
};

FacturaController.sumaGastosTotal = (req, res) =>{
    Factura.sum('total', {
        where: { id_persona: req.params.id }
    }).then(sum =>{
        res.status(200).json({
            suma: sum
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).send();
    });
}

FacturaController.busquedaFecha = (req, res) => {
    Factura.findAll({
        where: {
            fecha: {
                [sequelize.Op.lte]: req.body.fecha_inicio,
                [sequelize.Op.gte]: req.body.fecha_fin
            }
        }
    }).then(facturas =>{
        res.status(200).json(facturas);
    }).catch(err =>{
        console.log(err);
        res.status(500).send();
    });
}

module.exports = FacturaController;