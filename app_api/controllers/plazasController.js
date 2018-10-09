var PlazasDao = require('../../app_core/dao/plazasDao');
var Respuesta = require('../../app_core/helpers/respuesta');

var findAll = function(req, res) {

    PlazasDao.findAll().then(
        function(plaza) {
            res.status(200).json(plaza);
            //Respuesta.sendJsonResponse(res, 200, plaza);
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
            //Respuesta.sendJsonResponse(res, 500, error);
        }
    );
}

var findById = function(req, res) {
    PlazasDao.findById(req.params.id)
        .then(function(plaza) {
            Respuesta.sendJsonResponse(res, 200, plaza);
        })
        .catch(function(err) {
            Respuesta.sendJsonResponse(res, 500, err);
        });
}

var createPlaza = function(req, res) {
    var plaza = {
        llave: req.body.llave,
        techo: req.body.techo,
        disponible: req.body.disponible,
        id_sucursal: req.body.id_sucursal,
        id_vehiculo: req.body.id_vehiculo,
    };
    PlazasDao.createPlaza(plaza).then(function(plaza) {
        Respuesta.sendJsonResponse(res, 200, plaza);
    }).catch(function(err) {
        Respuesta.sendJsonResponse(res, 500, err);
    });
}

var updatePlaza = function(req, res) {

    var plazaUpdate = {
        llave: req.body.llave,
        techo: req.body.techo,
        disponible: req.body.disponible,
        id_sucursal: req.body.id_sucursal,
        id_vehiculo: req.body.id_vehiculo,
    };

    PlazasDao.updatePlaza(plazaUpdate, req.params.id, function(plaza, err) {
        if (err) {
            Respuesta.sendJsonResponse(res, 500, err);
        }
        if (plaza) {
            Respuesta.sendJsonResponse(res, 200, plaza);
        }
    }).catch(function(err) {
        Respuesta.sendJsonResponse(res, 500, err);
    });
}

var deletePlaza = function(req, res) {
    PlazasDao.deletePlaza(req.params.id).then(function(plaza) {
        if (plaza == 1) {
            Respuesta.sendJsonResponse(res, 200, { mensaje: "registro fue eliminado " });
        } else {
            Respuesta.sendJsonResponse(res, 404, { mensaje: "registro no eliminado " });

        }
    }).catch(function(err) {
        Respuesta.sendJsonResponse(res, 500, err);
    });
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.createPlaza = createPlaza;
module.exports.updatePlaza = updatePlaza;
module.exports.deletePlaza = deletePlaza;