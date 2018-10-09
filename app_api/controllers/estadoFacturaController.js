var EstadoFacturaDao = require("../../app_core/dao/estadoFacturaDao");
var Respuesta = require("../../app_core/helpers/respuesta");
var Errores = require("../../app_core/config/errors");

var findAll = function(req, res) {
    EstadoFacturaDao.findAll().then(function(facturas) {
        Respuesta.sendJsonResponse(res, 200, facturas);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, { "error": 'se ha producido un error en la consulta' })
    });
};

var findById = function(req, res) {
    EstadoFacturaDao.findById(req.params.id).then(function(factura) {
        Respuesta.sendJsonResponse(res, 200, factura);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 200, { "error": 'se ha producido un error en la consulta' });
    });
};

var create = function(req, res) {
    var variable = {
        nombre: req.body.nombre
    };
    EstadoFacturaDao.create(variable).then(function(variable) {
        Respuesta.sendJsonResponse(res, 200, variable);
    }).catch(function(err) {
        Respuesta.sendJsonResponse(res, 500, err);
    });
};

var deleteEstadoFactura = function(req, res) {
    EstadoFacturaDao.deleteById(req.params.id).then(function(compra) {
        if (compra == 1) {
            Respuesta.sendJsonResponse(res, 200, { "mensaje": "registro eliminado" });
        } else {
            Respuesta.sendJsonResponse(res, 404, { "mensaje": "registro no encontrado" });
        }
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, error);
    });
};

var generarError = function(req, res) {
    Respuesta.sendJsonResponse(res, 500, { "error": Errores.convertStringToHex(Errores.codigo_error.database.sin_conexion) });
};

var update = function(req, res) {
    var id = req.params.id;
    var actualizar = {
        nombre: req.body.nombre
    };
    EstadoFacturaDao.update(actualizar, id, function(variable, err) {
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

};

module.exports.generarError = generarError;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.deleteEstadoFactura = deleteEstadoFactura;
module.exports.create = create;
module.exports.update = update;