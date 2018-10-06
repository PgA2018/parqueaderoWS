var Express = require('express');
var CompraController=require("../controllers/compraController");
var UnidadNegocioController= require("../controllers/unidadNegocioController");


var router = Express.Router();

/*
 * RUTAS DE COMPRAS
 */
/*router.get("/compra",CompraController.findAll);
router.get("/compra/:id",CompraController.findById);
router.post("/compra",CompraController.addCompra);
router.delete("/compra/:id",CompraController.deleteCompra);
router.get("/error",CompraController.generarError);*/

router.get("/unidadnegocio", UnidadNegocioController.findAll);
module.exports = router; 
 