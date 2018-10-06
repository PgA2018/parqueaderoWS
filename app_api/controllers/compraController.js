var CompraDao= require("../../app_core/dao/compraDao");
var Respuesta= require("../../app_core/helpers/respuesta");
var Errores= require ("../../app_core/config/errors");

var findAll= function (req,res){
    CompraDao.findAll().then(function(compras){
        Respuesta.sendJsonResponse(res,200, compras);
    }).catch(function(error){
        Respuesta.sendJsonResponse(res,500,{"error":'se ha producido un error en la consulta'})
    });
};

var findById= function (req, res){
    CompraDao.findById(req.params.id).then(function(compra){
       Respuesta.sendJsonResponse(res,200,compra);
    }).catch(function(error){
       Respuesta.sendJsonResponse(res,200,{"error":'se ha producido un error en la consulta'});
    });
};

var addCompra=function (req,res){
  var compra={
      "fecha_compra":req.body.fecha_compra,
      "observacion":req.body.observacion
  };
  CompraDao.create(compra).then(function(compra){
     Respuesta.sendJsonResponse(res,200,compra)
  }).catch(function(error){
      Respuesta.sendJsonResponse(res,500,error);
  });
};

var deleteCompra= function (req, res){
    CompraDao.deleteById(req.params.id).then(function(compra){
        if(compra==1){
            Respuesta.sendJsonResponse(res,200,{"mensaje":"registro eliminado"});
        }
        else{
            Respuesta.sendJsonResponse(res,404,{"mensaje":"registro no encontrado"});
        }
    }).catch(function(error){
        Respuesta.sendJsonResponse(res,500,error);
    });
};


var darCompraCompleta= function(req, res){
   CompraDao.darCompraCompleta().then(function(resultado){
       Respuesta.sendJsonResponse(res,200,resultado);
   })
};

var generarError= function(req,res){
    Respuesta.sendJsonResponse(res,500,{"error":Errores.convertStringToHex(Errores.codigo_error.database.sin_conexion)});
};

module.exports.generarError=generarError;
module.exports.findAll=findAll;
module.exports.findById=findById;
module.exports.darCompraCompleta=darCompraCompleta;
module.exports.deleteCompra=deleteCompra;
module.exports.addCompra=addCompra;
