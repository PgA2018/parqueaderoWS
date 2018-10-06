var Respuesta= require("../../app_core/helpers/respuesta");


var findAll=function(req,res){
    Respuesta.sendJsonResponse(res,200,{"mensaje":"mi mensajito"});
};

module.exports.findAll=findAll;
