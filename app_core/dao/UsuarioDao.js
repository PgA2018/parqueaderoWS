var Models=require("../models/index");
var sequelize = Models.sequelize;

var findAll=function(){
    return Models.Usuario.findAll({});
};

var findById=function(identificador){
    return Models.Usuario.find({
        where:{
            id:identificador
        }
    });
};

var create= function(usuario){
  return  Models.Usuario.create({
       nombre:usuario.nombre,
       identificacion:usuario.identificacion,
       direccion:usuario.direccion,
       telefono:usuario.telefono,
       password:usuario.password,
       tipo_usuario:usuario.tipo_usuario,
       id_parqueadero:usuario.id_parqueadero
  });
};

var deleteById=function(identificador){
    return Models.Usuario.destroy({
         where:{
             id:identificador
         }
    });
};

var update = function(c, id, identificacion, callback) {
    Models.Usuario.find({
        where: {
            id: id
        }
    }).then(
        function(resultado) {
            if (resultado) {
                resultado.updateAttributes({
                    nombre: c.nombre,
                    identificacion: c.identificacion,
                    direccion: c.direccion,
                    telefono: c.telefono,
                    password: c.password,
                    tipo_usuario: c.tipo_usuario,
                    id_parqueadero: c.id_parqueadero,
                }).then(
                    function(Actualizado) {
                        Models.Usuario.findById(Actualizado.id).then(function(resultadoFinal) {
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
