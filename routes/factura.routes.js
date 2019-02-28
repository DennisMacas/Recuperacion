const router = require('express').Router();
var modeloFactura = require('../models/Factura');
const FacturaController = require('../controllers/factura.controller');



router.get('/', FacturaController.listarFacturas)
        .post('/', FacturaController.guardarFactura)
        .get('/clasificacion', FacturaController.cargarClasificacion)
        .post('/:id', FacturaController.modificarFactura);

router.get('/operaciones/sumapersonal/:id', FacturaController.sumaGastosPersonales)
        .get('/operaciones/sumatotal/:id', FacturaController.sumaGastosTotal)
            .get('/operaciones/busqueda', FacturaController.busquedaFecha);



module.exports = router;