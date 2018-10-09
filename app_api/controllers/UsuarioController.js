var UsuarioDao= require("../../app_core/dao/UsuarioDao");
var Respuesta= require("../../app_core/helpers/respuesta");
var Errores= require ("../../app_core/config/errors");

var findAll= function (req,res){
    UsuarioDao.findAll().then(function(usuario){
        Respuesta.sendJsonResponse(res,200, usuario);
    }).catch(function(error){
        Respuesta.sendJsonResponse(res,500,{"error":'se ha producido un error en la consulta'})
    });
};

var findById= function (req, res){
    UsuarioDao.findById(req.params.id).then(function(usuario){
       Respuesta.sendJsonResponse(res,200,usuario);
    }).catch(function(error){
       Respuesta.sendJsonResponse(res,200,{"error":'se ha producido un error en la consulta'});
    });
};

var addUsuario = function (req,res){
  console.log(req);
  var usuario = {
      nombre:req.body.nombre,
      identificacion:req.body.identificacion,
      direccion:req.body.direccion,
      telefono:req.body.telefono,
      password:req.body.password,
      tipo_usuario:req.body.tipo_usuario,
      id_parqueadero:req.body.id_parqueadero
  };
  console.log(usuario);
  UsuarioDao.create(usuario).then(function(usuario){
     Respuesta.sendJsonResponse(res,200,usuario)
  }).catch(function(error){
      Respuesta.sendJsonResponse(res,500,error);
  });
};

var deleteUsuario= function (req, res){
    UsuarioDao.deleteById(req.params.id).then(function(usuario){
        if(usuario==1){
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
        nombre: req.body.nombre,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        password: req.body.password,
        tipo_usuario: req.body.tipo_usuario,
        id_parqueadero: req.body.id_parqueadero
    };
    UsuarioDao.update(actualizar, id, function(variable, err) {
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
module.exports.deleteUsuario=deleteUsuario;
module.exports.addUsuario=addUsuario;
module.exports.update = update;
