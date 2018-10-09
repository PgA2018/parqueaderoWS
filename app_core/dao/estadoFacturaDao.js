var Models = require("../models/index");
var sequelize = Models.sequelize;

var findAll = function() {
    return Models.EstadoFactura.findAll({});
};

var findById = function(id) {
    return Models.EstadoFactura.find({
        where: {
            id_compra: id
        }
    });
};

var create = function(f) {
    return Models.EstadoFactura.create({
        nombre: f.nombre,
    });
};

var deleteById = function(f) {
    return Models.EstadoFactura.destroy({
        where: {
            id: f
        }
    })
};

var update = function(c, id, callback) {
    Models.EstadoFactura.find({
        where: {
            id: id
        }
    }).then(
        function(resultado) {
            if (resultado) {
                resultado.updateAttributes({
                    nombre: c.nombre
                }).then(
                    function(Actualizado) {
                        Models.EstadoFactura.findById(Actualizado.id).then(function(resultadoFinal) {
                            callback(resultadoFinal, null);
                        }).catch(function(err) {
                            callback(null, err);
                        })
                    }).catch(function(err) {
                    callback(null, err);
                });
            } else {
                callback(null, { "error": "No existe el elemento a actualizar" });
            }
        }).catch(function(err) {
        callback(null, err);
    })
};

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.update = update;