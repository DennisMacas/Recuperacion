const router = require('express').Router();
var modeloFactura = require('../models/Factura');
// ROUTES
router.get('/', (req, res)=> {
    res.render('factura');
});
router.get('/RegistrarFactura', (req, res)=> {
    res.render('factura_registro');
});

router.get('/editar/:id', async(req, res)=>{
    const {id} = req.params;
    const datos = await modeloFactura.findById(id);
    res.render('editar',{ 
        datos });
    });

router.post('/editado/:id', async(req, res)=>{
const {id}= req.params;
await modeloFactura.update({ 
    no_factura: req.body.no_factura,
    cliente: req.body.cliente,
    cedula: req.body.cedula,
    clasificacion: req.body.clasificacion,
    total: req.body.total,
    fecha: req.body.fecha,
},{where:{id_factura:id}});
res.redirect("/");
});

module.exports = router;