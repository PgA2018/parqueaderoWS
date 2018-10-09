var Models = require('../../app_core/models/index');
var sequelize = Models.sequelize;

var findAll = function() {
    return Models.Plazas.findAll({});
}

var findById = function(id) {
    return Models.Plazas.findOne({
        where: {
            id: id
        }
    });
}

var createPlaza = function(plaza) {
    return Models.Plazas.create({
        llave: plaza.llave,
        techo: plaza.techo,
        disponible: plaza.disponible,
        id_sucursal: plaza.id_sucursal,
        id_vehiculo: plaza.id_vehiculo,
    });
}

var updatePlaza = function(plaza, id, callback) {
    return Models.Plazas.find({
            where: {
                id: id
            }
        })
        .then(function(resultado) {
            if (resultado) {
                resultado.updateAttributes({
                        llave: plaza.llave,
                        techo: plaza.techo,
                        disponible: plaza.disponible,
                        id_sucursal: plaza.id_sucursal,
                        id_vehiculo: plaza.id_vehiculo,
                    })
                    .then(function(plazaActualizada) {
                        Models.Plazas.findById(plazaActualizada.id)
                            .then(function(resultadoFinal) {
                                callback(resultadoFinal, null);
                            })
                            .catch(function(err) {
                                callback(null, err);
                            });
                    })
                    .catch(function(err) {
                        callback(null, err);
                    });
            } else {
                callback(null, { "error": "no existe el elemento a actualizar" });
            }
        })
        .catch(function(err) {
            callback(null, err)
        });
}

var deletePlaza = function(id) {
    return Models.Plazas.destroy({
        where: {
            id: id
        }
    });
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.createPlaza = createPlaza;
module.exports.updatePlaza = updatePlaza;
module.exports.deletePlaza = deletePlaza;