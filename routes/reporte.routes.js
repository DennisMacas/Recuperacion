const router = require('express').Router();

const ReporteController = require('../controllers/reporte.controller');

router.get('/', ReporteController.obtenerReporte);

module.exports = router;