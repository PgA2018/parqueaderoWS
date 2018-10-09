var Models=require("../models/index");
var sequelize = Models.sequelize;

var findAll=function(){
    return Models.TipoUsuario.findAll({});
};

var findById=function(identificador){
    return Models.TipoUsuario.find({
        where:{
            id:identificador
        }
    });
};

var create= function(tipousuario){
  return  Models.TipoUsuario.create({
       nombre: tipousuario.nombre
  });
};

var deleteById=function(identificador){
    return Models.TipoUsuario.destroy({
         where:{
             id:identificador
         }
    });
};

var update = function(c, id, callback) {
    Models.TipoUsuario.find({
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
                        Models.TipoUsuario.findById(Actualizado.id).then(function(resultadoFinal) {
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
}


module.exports.findAll= findAll;
module.exports.findById= findById;
module.exports.create= create;
module.exports.deleteById=deleteById;
module.exports.update = update;
