var SucursalDao = require("../../app_core/dao/SucursalDao");
var Respuesta = require("../../app_core/helpers/respuesta");
var Errores = require("../../app_core/config/errors");

var findAll = function(req, res) {
    SucursalDao.findAll().then(function(sucursal) {
        Respuesta.sendJsonResponse(res, 200, sucursal);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, { "error": 'se ha producido un error en la consulta' })
    });
};

var findById = function(req, res) {
    SucursalDao.findById(req.params.id).then(function(sucursal) {
        Respuesta.sendJsonResponse(res, 200, sucursal);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 200, { "error": 'se ha producido un error en la consulta' });
    });
};

var addSucursal = function(req, res) {
    console.log(req);
    var sucursal = {
        id_parqueadero: req.body.id_parqueadero,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        descripcion: req.body.descripcion
    };
    SucursalDao.create(sucursal).then(function(sucursal) {
        Respuesta.sendJsonResponse(res, 200, sucursal)
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, error);
    });
};

var deleteSucursal = function(req, res) {
    SucursalDao.deleteById(req.params.id).then(function(sucursal) {
        if (sucursal == 1) {
            Respuesta.sendJsonResponse(res, 200, { "mensaje": "registro eliminado" });
        } else {
            Respuesta.sendJsonResponse(res, 404, { "mensaje": "registro no encontrado" });
        }
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, error);
    });
};

var update = function(req, res) {
    var id = req.params.id;
    var actualizar = {
        id_parqueadero: req.body.id_parqueadero,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        descripcion: req.body.descripcion
    };
    SucursalDao.update(actualizar, id, function(variable, err) {
            if (err) {
                Respuesta.sendJsonResponse(res, 500, err);
            }
            if (variable) {
                Respuesta.sendJsonResponse(res, 200, variable);
            }
        })
        .catch(function(err) {
            Respuesta.sendJsonResponse(res, 500, err);
        });

}


module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.deleteSucursal = deleteSucursal;
module.exports.addSucursal = addSucursal;
module.exports.update = update;