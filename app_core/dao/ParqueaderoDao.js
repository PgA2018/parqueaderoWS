var Models = require("../models/index");
var sequelize = Models.sequelize;

var findAll = function() {
    return Models.Parqueadero.findAll({});
};

var findById = function(identificador) {
    return Models.Parqueadero.find({
        where: {
            id: identificador
        }
    });
};

var create = function(parqueadero) {
    return Models.Parqueadero.create({
        nombre: parqueadero.nombre
    });
};

var deleteById = function(identificador) {
    return Models.Parqueadero.destroy({
        where: {
            id: identificador
        }
    });
};

var update = function(parqueadero, id, callback) {
    return Models.Parqueadero.find({
            where: {
                id: id
            }
        })
        .then(function(resultado) {
            if (resultado) {
                resultado.updateAttributes({
                        nombre: parqueadero.nombre
                    })
                    .then(function(parqueaderoActualizada) {
                        Models.Parqueadero.findById(parqueaderoActualizada.id)
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