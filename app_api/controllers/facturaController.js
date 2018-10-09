var FacturaDao = require("../../app_core/dao/facturaDao");
var Respuesta = require("../../app_core/helpers/respuesta");
var Errores = require("../../app_core/config/errors");

var findAll = function(req, res) {
    FacturaDao.findAll().then(function(facturas) {
        Respuesta.sendJsonResponse(res, 200, facturas);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, { "error": 'se ha producido un error en la consulta' })
    });
};

var findById = function(req, res) {
    FacturaDao.findById(req.params.id).then(function(factura) {
        Respuesta.sendJsonResponse(res, 200, factura);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 200, { "error": 'se ha producido un error en la consulta' });
    });
};

var create = function(req, res) {
    var variable = {
        num_fac: req.body.num_fac,
        fec_entrada: req.body.fec_entrada,
        valor: req.body.valor,
        placa_vehiculo: req.body.placa_vehiculo,
        id_plaza: req.body.id_plaza,
        fec_salida: req.body.fec_salida,
        id_estado_fac: req.body.id_estado_fac
    };
    FacturaDao.create(variable).then(function(variable) {
        Respuesta.sendJsonResponse(res, 200, variable);
    }).catch(function(err) {
        Respuesta.sendJsonResponse(res, 500, err);
    });
};

var deleteFactuta = function(req, res) {
    FacturaDao.deleteById(req.params.id).then(function(factura) {
        if (factura == 1) {
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
        num_fac: req.body.num_fac,
        fec_entrada: req.body.fec_entrada,
        valor: req.body.valor,
        placa_vehiculo: req.body.placa_vehiculo,
        id_plaza: req.body.id_plaza,
        fec_salida: req.body.fec_salida,
        id_estado_fac: req.body.id_estado_fac
    };
    FacturaDao.update(actualizar, id, function(variable, err) {
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

module.exports.generarError = generarError;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.deleteFactuta = deleteFactuta;
module.exports.create = create;
module.exports.update = update;