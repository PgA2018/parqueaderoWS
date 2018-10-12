var Models = require("../models/index");
var sequelize = Models.sequelize;

var findAll = function() {
    return Models.Sucursal.findAll({});
};

var findById = function(identificador) {
    return Models.Sucursal.find({
        where: {
            id: identificador
        }
    });
};

var create = function(sucursal) {
    return Models.Sucursal.create({
        id_parqueadero: sucursal.id_parqueadero,
        direccion: sucursal.direccion,
        telefono: sucursal.telefono,
        descripcion: sucursal.descripcion
    });
};

var deleteById = function(identificador) {
    return Models.Sucursal.destroy({
        where: {
            id: identificador
        }
    });
};

var update = function(sucursal, id, callback) {
    return Models.Sucursal.find({
            where: {
                id: id
            }
        })
        .then(function(resultado) {
            if (resultado) {
                resultado.updateAttributes({
                        id_parqueadero: sucursal.id_parqueadero,
                        direccion: sucursal.direccion,
                        telefono: sucursal.telefono,
                        descripcion: sucursal.descripcion
                    })
                    .then(function(sucursalActualizada) {
                        Models.Sucursal.findById(sucursalActualizada.id)
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


module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.update = update;