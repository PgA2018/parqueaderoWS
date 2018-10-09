var TipoUsuarioDao= require("../../app_core/dao/TipoUsuarioDao");
var Respuesta= require("../../app_core/helpers/respuesta");
var Errores= require ("../../app_core/config/errors");

var findAll= function (req,res){
    TipoUsuarioDao.findAll().then(function(tipousuario){
        Respuesta.sendJsonResponse(res,200, tipousuario);
    }).catch(function(error){
        Respuesta.sendJsonResponse(res,500,{"error":'se ha producido un error en la consulta'})
    });
};

var findById= function (req, res){
    TipoUsuarioDao.findById(req.params.id).then(function(tipousuario){
       Respuesta.sendJsonResponse(res,200,tipousuario);
    }).catch(function(error){
       Respuesta.sendJsonResponse(res,200,{"error":'se ha producido un error en la consulta'});
    });
};

var addTipoUsuario=function (req,res){
  var tipousuario={
      nombre:req.body.nombre
  };
  TipoUsuarioDao.create(tipousuario).then(function(tipousuario){
     Respuesta.sendJsonResponse(res,200,tipousuario)
  }).catch(function(error){
      Respuesta.sendJsonResponse(res,500,error);
  });
};

var deleteTipoUsuario= function (req, res){
    TipoUsuarioDao.deleteById(req.params.id).then(function(tipousuario){
        if(tipousuario==1){
            Respuesta.sendJsonResponse(res,200,{"mensaje":"registro eliminado"});
        }
        else{
            Respuesta.sendJsonResponse(res,404,{"mensaje":"registro no encontrado"});
        }
    }).catch(function(error){
        Respuesta.sendJsonResponse(res,500,error);
    });
};

var update = function(req, res) {
    var id = req.params.id;
    var actualizar = {
        nombre: req.body.nombre
    };
    TipoUsuarioDao.update(actualizar, id, function(variable, err) {
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


module.exports.findAll=findAll;
module.exports.findById=findById;
module.exports.deleteTipoUsuario=deleteTipoUsuario;
module.exports.addTipoUsuario=addTipoUsuario;
module.exports.update = update;
