var Express = require('express');
var PlazasController = require("../controllers/plazasController");


var router = Express.Router();

/*
 * RUTAS DE PLAZAS
 */

router.get("/plazas", PlazasController.findAll);
router.get("/plazas/:id", PlazasController.findById);
router.post("/plazas", PlazasController.createPlaza);
router.put("/plazas/:id", PlazasController.updatePlaza);
router.delete("/plazas/:id", PlazasController.deletePlaza);


module.exports = router;