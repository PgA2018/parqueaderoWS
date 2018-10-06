var Request = require("request");
var Q = require("q");
var Fs = require("fs");
var Crypto = require("crypto");
var Models = require("../models/index");

sequelize = Models.sequelize

/**
 * 
 * @param {Object} archivo objeto de tipo file
 * @param {String} nombre nombre del archivo
 * @param {String} directorio identificador del directorio
 * @param {String} modulo identificador del modulo
 * @param {Object} transaccion objeto de transaccion 
 */
var subirArchivo = function(archivo, nombre, directorio, modulo, transaccion, directorio_especifico = "") {

    var deferred = Q.defer();

    var peticion = Request.post(

        process.env.GENERAL + "/archivos/subirarchivo",

        async function(err, httpResponse, body) {
            if (err) {

                deferred.reject(err);
            } else if (httpResponse.statusCode == 200) {

                try {
                    var respuesta = JSON.parse(body);

                    var archivo_nuevo = {
                        nombre: respuesta.nombre_archivo,
                        firma: respuesta.hash,
                        tamano: archivo.size,
                        fecha_carga: new Date(),
                        id_directorio: directorio,
                        id_proarc: modulo
                    };

                    var archivo_registrado = await registrarArchivo(archivo_nuevo, transaccion);
                    deferred.resolve({ "archivo": archivo_registrado, "transaccion": transaccion });
                } catch (error) {
                    deferred.reject(error);
                }
            } else {
                deferred.reject({ "error": "Error en el web service de archivos" });
            }
        }

    );

    var form = peticion.form();

    form.append("nombre", nombre);
    form.append("archivo", Fs.createReadStream(archivo.path));
    form.append("directorio", directorio);
    if (!directorio_especifico == "") {
        form.append("directorio_especifico", directorio_especifico);
    }

    return deferred.promise;
};


/**
 * 
 * @param {Array} archivos son un arreglo de objetos donde estan los archivos a subir con los atributos archivo y nombre
 * @param {String} directorio es el identificador del directorio donde seran subidos
 * @param {String} modulo identificador del modulo
 * @param {Object} transaccion objeto de transaccion 
 */
var subirArchivosBloque = function(archivos, directorio, modulo, transaccion, directorio_especifico = "") {

    var deferred = Q.defer();


    var peticion = Request.post(

        process.env.GENERAL + "/archivos/subirarchivosbloque",

        async function(err, httpResponse, body) {
            if (err) {
                deferred.reject(err);
            } else if (httpResponse.statusCode == 200) {
                try {
                    //envia el resultado en un arreglo con objetos que tienen como atributos nombre y hash 
                    var respuesta = JSON.parse(body);
                    var archivosRegistro = new Array();

                    respuesta.archivos.forEach(function(item, index) {
                        var auxiliar = {
                            nombre: item.nombre_archivo,
                            firma: item.hash,
                            tamano: item.tamano,
                            fecha_carga: new Date(),
                            id_directorio: directorio,
                            id_proarc: modulo
                        }

                        archivosRegistro.push(auxiliar);
                    });

                    var registros = await registrarArchivosBloque(archivosRegistro, transaccion);
                    deferred.resolve(registros);

                } catch (error) {
                    deferred.reject(error);
                }

            } else {
                deferred.reject({ "error": "Error en el web service de archivos" });
            }
        }

    );

    var form = peticion.form();


    archivos.forEach(async function(item, index) {

        form.append("nombre_" + index, item.nombre);
        form.append("archivo_" + index, Fs.createReadStream(item.archivo.path));

    });

    form.append("directorio", directorio);
    if (!directorio_especifico == "") {
        form.append("directorio_especifico", directorio_especifico);
    }

    return deferred.promise;

}

var registrarArchivo = function(archivo, transaccion) {
    return Models.GenerArchivo.create(
        archivo, { transaction: transaccion });
};

//TODOOO REVISAR QUE FUNCIONE EN TEORIA DEBERIA HACERLO JEJE
var registrarArchivosBloque = function(archivosNuevos, transaccion) {
    return Models.GenerArchivo.bulkCreate(archivosNuevos, { transaction: transaccion, returning: true });
};

module.exports.subirArchivo = subirArchivo;
module.exports.subirArchivosBloque = subirArchivosBloque;