var pdf = require('html-pdf');

const Factura = require('../models/Factura');

const ReporteController = {};

ReporteController.obtenerReporte = (req, res) => {
    Factura.findAll({ })
    .then(facturas => {
        var contenido = `<h1>Reporte de Facturas</h1>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Cedula</th>
                <th scope="col">No. Factura</th>
                <th scope="col">Fecha</th>
                <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody>`;
        var i = 1;
        facturas.forEach(element => {
            contenido += `<tr>
            <th scope="row">`+ i +`</th>
            <td>`+ element.cliente +`</td>
            <td>`+ element.cedula +`</td>
            <td>`+ element.no_factura +`</td>
            <td>`+ element.fecha +`</td>
            <td>`+ element.total +`</td>
            </tr>`;
        });
        contenido += '</tbody></table>';
        var options = {
                "format": 'A4',
                "header": {
                "height": "60px"
                },
                "footer": {
                "height": "22mm"
                }
            };
        pdf.create(contenido, options).toFile('./reporte.pdf', function(err, resp) {
            if (err){
                console.log(err);
            } else {
                console.log(resp);
            }
        });
        res.redirect('/reportes/'+ new Date() + '.pdf');
    }).catch((err) =>{
        console.log(err);
        next(err);
    })
}

module.exports = ReporteController;