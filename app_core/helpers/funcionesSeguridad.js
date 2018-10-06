/**
 * @file archivo que contiene el modulo de funciones varias de seguridad
 * @name funcionesSeguridad.js
 * @author David Villota <david.villlota@udenar.edu.co>
 * @license UDENAR
 * @copyright 2016 Udenar
 **/
var Request= require("request");
var Q= require("q");
var Respuesta = require("../helpers/respuesta")

/**
* Modulo que agrupa todas las funciones de seguridad de autenticacion de tokens y desencriptacion de la informacion
* @module FuncionesSeguridad
**/

/**
* funcion middleware que administra y valida la autenticacion a traves del token conectandose con el servidor ARGUS
* @param {Object} req - objeto de peticion.
* @param {Object} res - objeto de respuesta.
* @param {function} next - funcion next.
* @returns {function} next- funcion next para continuar con la ejecucion del codigo que llama al middleware
**/
var autorizacion= function(req,res,next){
  var ip= codificarIp(req.headers.ip_token);
  if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
      var token = req.headers.authorization.split(' ')[1];
      console.log(token);
      console.log(ip);
      var data= {
        token: token,
        ip:ip
      };
      Request.post(
        {
            url:process.env.ARGUS+"/validarToken",
            form:data
        },
        function (err, httpResponse, body){
            if(err){

                Respuesta.sendJsonResponse(res,500,{"error":"existe un error en la autenticacion de la sesion"});
            }
            else if(httpResponse.statusCode==200){

                return next();
            }
            else{

                Respuesta.sendJsonResponse(res,500,body);
            }
        }
    );
  }
  else{
      Respuesta.sendJsonResponse(res,500,{"error":"el usuario no se encuentra autenticado"});
  }
};


/**
* funcion que permite obtener los datos sensibles del token es decir el id del usuario
* @param {Object} req - objeto de peticion
* @returns {function} promise - promesa de resolucion de la funcion con los datos del usuario autenticado
**/
var darInfotoken= function(req){
  var deferred= Q.defer();
  if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
      var token = req.headers.authorization.split(' ')[1];
      var ip= req.headers.ip_token;
      console.log(ip);
      console.log(token);
      var data={
          token:token,
          ip:ip
      };
      Request.post({
          url:process.env.ARGUS+"/infotoken",
          form:data
      },
      function(err,httpResponse,body){
          if(err){
              deferred.reject(err);
          }
          else if(httpResponse.statusCode==200){
              var respuesta = JSON.parse(body);
              deferred.resolve(respuesta);
          }
          else{
              deferred.reject({"error":"error en la obtencion de la informacion"});
          }
      });
  }
  else{
     deferred.reject({"error":"no hay token de autorizacion"});
  }
  return deferred.promise;
};

/**
* funcion que permite obtener los datos no snsibles del usuario como nombres y demas cosas
* @param {string} ip - ip desde la cual se realiza la peticion
* @param {string} token - token de sesion del usuario
* @returns {function} promise - promesa de resolucion de la funcion con los datos del usuario autenticado
**/
var darInfoUsuario = function(ip, token){

    var deferred= Q.defer();

    var data={
        token:token,
        ip:ip
    };
    Request.post(
        {
            url:process.env.ARGUS+"/darinfoUsuario",
            form:data,
            headers: {
                'ip_token': ip,
                'Authorization': 'Bearer '+token
            }
        },
        function(err,httpResponse,body){
            if(err){
                deferred.reject(err);
            }
            else if(httpResponse.statusCode==200){
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else{
                deferred.reject({"error":"error en la obtencion de la informacion"});
            }
        }
    );
    return deferred.promise;
};

/**
* funcion que permite realizar la operacion de cierre de sesion
* @param {string} ip - ip desde la cual se realiza la peticion
* @param {string} token - token de sesion del usuario
* @returns {function} promise - promesa de resolucion de la funcion
**/
var cerrarSesion= function(ip, token){
    var deferred= Q.defer();

    var data={
        token:token,
        ip:ip
    };

    Request.post(
        {
            url:process.env.ARGUS+"/logoutexterno",
            form:data,
            headers: {
                'ip_token': ip,
                'Authorization': 'Bearer '+token
            }
        },
        function(err,httpResponse,body){
            if(err){
                deferred.reject(err);
            }
            else if(httpResponse.statusCode==200){
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else{
                deferred.reject({"error":"error en el cierre de sesion"});
            }
        }
    );

    return deferred.promise;
};

/**
* funcion que permite obtener las opciones de un modulo determinado
* @param {string} ip - ip desde la cual se realiza la peticion
* @param {string} token - token de sesion del usuario
* @param {string} modulo - modulo en el que se encuentra el usuario
* @returns {function} promise - promesa de resolucion de la funcion con las opciones permitidas para el usuario
**/
var darOpcionesModulo= function(ip,token, modulo){

    var deferred= Q.defer();

    var data={
        token:token,
        ip:ip,
        modulo:modulo
    };

    Request.post(
        {
            url:process.env.ARGUS+"/daropcionesmodulo",
            form:data
        },
        function(err,httpResponse,body){
            if(err){
                deferred.reject(err);
            }
            else if(httpResponse.statusCode==200){
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else{
                deferred.reject({"error":"error al obtener las opciones del usuario"});
            }
        }
    )

    return deferred.promise;

};

/**
* funcion que permite verificar si un usuario tiene permitido el acceso a una ruta del modulo
* @param {string} ip - ip desde la cual se realiza la peticion
* @param {string} token - token de sesion del usuario
* @param {string} ruta - ruta a evaluar
* @returns {function} promise - promesa de resolucion de la funcion
**/
var autorizarRuta= function(ip,token,ruta){

    var deferred= Q.defer();

    var data={
        token:token,
        ip:ip,
        ruta:ruta
    };

    Request.post(
        {
            url:process.env.ARGUS+"/autorizarruta",
            form:data
        },
        function(err,httpResponse,body){
            if(err){
                deferred.reject(err);
            }
            else if(httpResponse.statusCode==200){
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else{
                deferred.reject({"error":"error al verificar la autorizacion de la ruta"});
            }
        }
    )

    return deferred.promise;

};

/**
* funcion que permite codificar una direccion ip a formato de puntos ej: 90.1.1.1
* @param {string} ip - ip a formatear
* @returns {string} codificada - ip formateada
**/
var codificarIp=function(ip){
	var codificada=ip.replace(/\:/g,".");
	return codificada;
};

module.exports.autorizacion= autorizacion;
module.exports.darInfotoken= darInfotoken;
module.exports.darInfoUsuario=darInfoUsuario;
module.exports.cerrarSesion=cerrarSesion;
module.exports.darOpcionesModulo=darOpcionesModulo;
module.exports.autorizarRuta=autorizarRuta;

