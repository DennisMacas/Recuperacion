const router = require('express').Router();

const SWController = require('../controllers/SW');

router.get('/listaFacturas', SWController.obtenerFacturas);


module.exports = router;