
var Respuesta= require("../../app_core/helpers/respuesta");
var FuncionesSeguridad= require("../../app_core/helpers/funcionesSeguridad");


/**
* funcion que permite dar informacion del usuario de los datos no sensibles como nombres etc...
* @param {Object} req - objeto de peticion
* @param {Object} res - objeto de respuesta
*
**/
var darInfousuario= function(req,res){
	if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        
        var token = req.headers.authorization.split(' ')[1];
        var ip= req.headers.ip_token;

        FuncionesSeguridad.darInfoUsuario(ip,token).then(function(usuario){
            Respuesta.sendJsonResponse(res,200,usuario);
        }).catch(function(error){
            Respuesta.sendJsonResponse(res,500,{"message":"No pudimos autenticar su sesión"})
        });

    }
    else{
        Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
    }    
};

/**
* funcion que permite realizar el proceso de cierre de sesion
* @param {Object} req - objeto de peticion
* @param {Object} res - objeto de respuesta
*
**/
var cerrarSesion= function(req,res){
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        if(req.headers.ip_token){
            var token= req.headers.authorization.split(' ')[1];
            var ip=req.headers.ip_token;
            FuncionesSeguridad.cerrarSesion(ip,token).then(function(resultado){
                Respuesta.sendJsonResponse(res,200,{"message":"cerrar sesion"});
            }).catch(function(error){
                Respuesta.sendJsonResponse(res,500,error);
            });
        }
        else{
            Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
        }
    }
    else{
        Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
    }
};

/**
* funcion que permite obtener las opciones permitidas para un usuario en un modulo especifico, estas opciones son las que se listaran en los menus del aplicativo
* @param {Object} req - objeto de peticion
* @param {Object} res - objeto de respuesta
*
**/
var darOpcionesModulo= function(req,res){
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        if(req.headers.ip_token){
            if(req.headers.modulo_id){
                var token= req.headers.authorization.split(' ')[1];
                var ip=req.headers.ip_token;
                var modulo= req.headers.modulo_id;
                FuncionesSeguridad.darOpcionesModulo(ip,token,modulo).then(function(resultado){
                    Respuesta.sendJsonResponse(res,200,resultado);
                }).catch(function(error){
                    Respuesta.sendJsonResponse(res,500,{"message":"Lo sentimos, no se encuentra autorizado para acceder a este aplicativo"});        
                });
            }
            else{
                Respuesta.sendJsonResponse(res,500,{"message":"Lo sentimos, no se encuentra autorizado para acceder a este aplicativo"});    
            }
            
        }
        else{
            Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
        } 
    }
    else{
        Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
    }           
};

/**
* funcion que permite verificar si un usuario tiene permitido el acceso a una ruta especifica del sistema
* @param {Object} req - objeto de peticion
* @param {Object} res - objeto de respuesta
*
**/
var autorizarRuta= function(req,res){
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        if(req.headers.ip_token){
            var token= req.headers.authorization.split(' ')[1];
            var ip=req.headers.ip_token;
            var ruta= req.body.ruta;
            FuncionesSeguridad.autorizarRuta(ip,token,ruta).then(function(resultado){
                Respuesta.sendJsonResponse(res,200,{"message":"usuario autorizado"});
            }).catch(function(error){
                Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra autorizado para acceder a esta opcion"});
            });
        }
        else{
            Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
        } 
    }
    else{
        Respuesta.sendJsonResponse(res,500,{"message":"No se encuentra una sesión activa para el usuario"});
    }        
};


module.exports.darInfousuario= darInfousuario;
module.exports.cerrarSesion=cerrarSesion;
module.exports.darOpcionesModulo=darOpcionesModulo;
module.exports.autorizarRuta= autorizarRuta;