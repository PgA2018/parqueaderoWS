var Express = require('express');
var CompraController=require("../controllers/compraController");
var UsuarioController=require("../controllers/UsuarioController");
var TipoUsuarioController=require("../controllers/TipoUsuarioController");


var router = Express.Router();


//crud de usuario*******************************************************
router.get("/usuario", UsuarioController.findAll);
router.get("/usuario/:id", UsuarioController.findById);
router.post("/usuario", UsuarioController.addUsuario);
router.delete("/usuario/:id", UsuarioController.deleteUsuario);
router.put('/usuario/:id', UsuarioController.update);
module.exports = router; 
//*********************************************************************


//crud de usuario*******************************************************
router.get("/tipousuario", TipoUsuarioController.findAll);
router.get("/tipousuario/:id", TipoUsuarioController.findById);
router.post("/tipousuario", TipoUsuarioController.addTipoUsuario);
router.delete("/tipousuario/:id", TipoUsuarioController.deleteTipoUsuario);
router.put("/tipousuario/:id", TipoUsuarioController.update);
module.exports = router; 
//*********************************************************************
 