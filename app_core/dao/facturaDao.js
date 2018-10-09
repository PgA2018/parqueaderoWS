var Models = require("../models/index");
var sequelize = Models.sequelize;

var findAll = function() {
    return Models.Factura.findAll({});
};

var findById = function(id) {
    return Models.Factura.find({
        where: {
            id_compra: id
        }
    });
};

var create = function(f) {
    return Models.Factura.create({
        num_fac: f.num_fac,
        fec_entrada: f.fec_entrada,
        valor: f.valor,
        placa_vehiculo: f.placa_vehiculo,
        id_plaza: f.id_plaza,
        fec_salida: f.fec_salida,
        id_estado_fac: f.id_estado_fac
    });
};

var deleteById = function(f) {
    return Models.Factura.destroy({
        where: {
            id: f
        }
    })
};

var update = function(c, id, callback) {
    Models.Factura.find({
        where: {
            id: id
        }
    }).then(
        function(resultado) {
            if (resultado) {
                resultado.updateAttributes({
                    num_fac: c.num_fac,
                    fec_entrada: c.fec_entrada,
                    valor: c.valor,
                    placa_vehiculo: c.placa_vehiculo,
                    id_plaza: c.id_plaza,
                    fec_salida: c.fec_salida,
                    id_estado_fac: c.id_estado_fac
                }).then(
                    function(Actualizado) {
                        Models.Factura.findById(Actualizado.id).then(function(resultadoFinal) {
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