var ParqueaderoDao = require("../../app_core/dao/ParqueaderoDao");
var Respuesta = require("../../app_core/helpers/respuesta");
var Errores = require("../../app_core/config/errors");

var findAll = function(req, res) {
    ParqueaderoDao.findAll().then(function(parqueadero) {
        Respuesta.sendJsonResponse(res, 200, parqueadero);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, { "error": 'se ha producido un error en la consulta' })
    });
};

var findById = function(req, res) {
    ParqueaderoDao.findById(req.params.id).then(function(parqueadero) {
        Respuesta.sendJsonResponse(res, 200, parqueadero);
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 200, { "error": 'se ha producido un error en la consulta' });
    });
};

var addParqueadero = function(req, res) {
    console.log(req);
    var parqueadero = {
        nombre: req.body.nombre
    };
    ParqueaderoDao.create(parqueadero).then(function(parqueadero) {
        Respuesta.sendJsonResponse(res, 200, parqueadero)
    }).catch(function(error) {
        Respuesta.sendJsonResponse(res, 500, error);
    });
};

var deleteParqueadero = function(req, res) {
    ParqueaderoDao.deleteById(req.params.id).then(function(parqueadero) {
        if (parqueadero == 1) {
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
        nombre: req.body.nombre
    };
    ParqueaderoDao.update(actualizar, id, function(variable, err) {
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
module.exports.deleteParqueadero = deleteParqueadero;
module.exports.addParqueadero = addParqueadero;
module.exports.update = update;