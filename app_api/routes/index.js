var Express = require('express');
var UsuarioController = require("../controllers/UsuarioController");
var TipoUsuarioController = require("../controllers/TipoUsuarioController");
var PlazasController = require("../controllers/plazasController");
var FacturaController = require("../controllers/facturaController");
var EstadoFacturaController = require("../controllers/estadoFacturaController");
var ParqueaderoController = require("../controllers/ParqueaderoController");
var SucursalController = require("../controllers/SucursalController");

var router = Express.Router();


/*
 * RUTAS DE USUARIOS
 */
router.get("/usuario", UsuarioController.findAll);
router.get("/usuario/:id", UsuarioController.findById);
router.post("/usuario", UsuarioController.addUsuario);
router.delete("/usuario/:id", UsuarioController.deleteUsuario);
router.put('/usuario/:id', UsuarioController.update);
module.exports = router;
/*
 * RUTAS DE TIPO USUARIO
 */
router.get("/tipousuario", TipoUsuarioController.findAll);
router.get("/tipousuario/:id", TipoUsuarioController.findById);
router.post("/tipousuario", TipoUsuarioController.addTipoUsuario);
router.delete("/tipousuario/:id", TipoUsuarioController.deleteTipoUsuario);
router.put("/tipousuario/:id", TipoUsuarioController.update);
module.exports = router;

/*
 * RUTAS DE PLAZAS
 */

router.get("/plazas", PlazasController.findAll);
router.get("/plazas/:id", PlazasController.findById);
router.get("/plazasDisponibles", PlazasController.mostrar);
router.post("/plazas", PlazasController.createPlaza);
router.put("/plazas/:id", PlazasController.updatePlaza);
router.delete("/plazas/:id", PlazasController.deletePlaza);
module.exports = router;


/*
 * RUTAS FACTURA
 */
router.get("/factura", FacturaController.findAll);
router.get("/factura/:id", FacturaController.findById);
router.post("/factura", FacturaController.create);
router.delete("/factura/:id", FacturaController.deleteFactuta);
router.put("/factura/:id", FacturaController.update);
module.exports = router;
/*
 * RUTAS ESTADO FACTURA
 */
router.get("/estadofactura", EstadoFacturaController.findAll);
router.get("/estadofactura/:id", EstadoFacturaController.findById);
router.post("/estadofactura", EstadoFacturaController.create);
router.delete("/estadofactura/:id", EstadoFacturaController.deleteEstadoFactura);
router.put("/estadofactura/:id", EstadoFacturaController.update);
module.exports = router;

/*
 * RUTAS Parqueadero
 */
router.get("/parqueadero", ParqueaderoController.findAll);
router.get("/parqueadero/:id", ParqueaderoController.findById);
router.post("/parqueadero", ParqueaderoController.addParqueadero);
router.delete("/parqueadero/:id", ParqueaderoController.deleteParqueadero);
router.put("/parqueadero/:id", ParqueaderoController.update);
module.exports = router;

/*
 * RUTAS Parqueadero
 */
router.get("/sucursal", SucursalController.findAll);
router.get("/sucursal/:id", SucursalController.findById);
router.post("/sucursal", SucursalController.addSucursal);
router.delete("/sucursal/:id", SucursalController.deleteSucursal);
router.put("/sucursal/:id", SucursalController.update);
module.exports = router;