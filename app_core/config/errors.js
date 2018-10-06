var codigo_error = {
    database: {
        "sin_conexion": "0101",
        "llave_duplicada": "0102",
        "error_foranea": "0103",
        "tamaño_maximo": "0104",
    },
    codigo: {
        "division_zero": "0201"
    },
    aplicacion: {
        modulo1: {
            "eliminacion_usuario": "030101"
        }
    },
    autenticacion: {
        "credenciales_erronea": "0401",
        "sesion_expirada": "0402"
    }

};

var convertStringToHex = function(cadena) {
    return parseInt(cadena).toString(16);
};

module.exports.convertStringToHex = convertStringToHex;
module.exports.codigo_error = codigo_error;